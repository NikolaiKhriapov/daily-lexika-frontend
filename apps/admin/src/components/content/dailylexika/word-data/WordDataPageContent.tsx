import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Field, FieldProps, Form, Formik, getIn, useFormikContext } from 'formik';
import * as Yup from 'yup';
import {
  Checkbox,
  ColorMode,
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  Tooltip,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useCreateWordDataMutation, useDeleteWordDataMutation, useGetPageOfWordDataQuery, useUpdateWordDataMutation } from '@admin/store/api/dailyLexikaWordDataAPI';
import { useGetPageOfWordPacksQuery } from '@admin/store/api/dailyLexikaWordPackAPI';
import { Platform, WordDataCreateDto, WordDataDto, WordDataPatchDto, WordPackDto } from '@library/daily-lexika';
import { errorNotification, successNotification } from '@library/shared/services';
import {
  AlertDialog,
  Button,
  ButtonsContainer,
  ButtonType,
  ButtonWithIcon,
  ButtonWithIconType,
  Heading,
  Input,
  Modal,
  TablePagesPanel,
  Text,
} from '@library/shared/ui';
import { borderStyles, theme } from '@library/shared/utils';

type ExampleFormValue = {
  ch: string;
  en: string;
  ru: string;
  pinyin: string;
};

type WordDataFormValues = {
  id?: number;
  wordOfTheDayDate?: string;
  nameChinese: string;
  transcription: string;
  nameEnglish: string;
  nameRussian: string;
  definition: string;
  examples: ExampleFormValue[];
  listOfWordPackIds: number[];
  platform: Platform;
};

const EXAMPLE_COUNT = 5;

const createEmptyExamples = () => Array.from({ length: EXAMPLE_COUNT }, () => ({
  ch: '',
  en: '',
  ru: '',
  pinyin: '',
}));

const buildInitialValues = (platform: Platform, wordData?: WordDataDto): WordDataFormValues => {
  const examples = (wordData?.examples && wordData.examples.length > 0)
    ? wordData.examples.map((example) => ({
      ch: example.ch || '',
      en: example.en || '',
      ru: example.ru || '',
      pinyin: example.pinyin || '',
    }))
    : createEmptyExamples();

  const normalizedExamples = examples.length >= EXAMPLE_COUNT
    ? examples.slice(0, EXAMPLE_COUNT)
    : examples.concat(createEmptyExamples().slice(examples.length));

  return {
    id: wordData?.id,
    wordOfTheDayDate: wordData?.wordOfTheDayDate,
    nameChinese: wordData?.nameChinese || '',
    transcription: wordData?.transcription || '',
    nameEnglish: wordData?.nameEnglish || '',
    nameRussian: wordData?.nameRussian || '',
    definition: wordData?.definition || '',
    examples: normalizedExamples,
    listOfWordPackIds: wordData?.listOfWordPackIds || [],
    platform: wordData?.platform || platform,
  };
};

const toWordDataPayload = (values: WordDataFormValues): WordDataCreateDto => {
  const examples = values.examples.map((example) => ({
    ch: example.ch.trim(),
    en: example.en.trim(),
    ru: example.ru.trim(),
    ...(values.platform === Platform.CHINESE ? { pinyin: example.pinyin.trim() } : {}),
  }));

  return {
    nameChinese: values.nameChinese.trim(),
    transcription: values.transcription.trim(),
    nameEnglish: values.nameEnglish.trim(),
    nameRussian: values.nameRussian.trim(),
    definition: values.definition.trim(),
    examples,
    listOfWordPackIds: values.listOfWordPackIds,
    platform: values.platform,
  };
};

const toWordDataPatchPayload = (values: WordDataFormValues): WordDataPatchDto => {
  const payload = toWordDataPayload(values);
  const { platform: _platform, ...patchPayload } = payload;
  return patchPayload;
};

const createValidationSchema = () => {
  const required = 'Required';
  const examplesEnglish = Yup.array()
    .of(Yup.object({
      ch: Yup.string().required(required),
      en: Yup.string().required(required),
      ru: Yup.string().required(required),
    }))
    .length(EXAMPLE_COUNT, `Must have ${EXAMPLE_COUNT} examples`);
  const examplesChinese = Yup.array()
    .of(Yup.object({
      ch: Yup.string().required(required),
      pinyin: Yup.string().required(required),
      en: Yup.string().required(required),
      ru: Yup.string().required(required),
    }))
    .length(EXAMPLE_COUNT, `Must have ${EXAMPLE_COUNT} examples`);

  return Yup.object({
    platform: Yup.mixed<Platform>().required(required),
    nameEnglish: Yup.string()
      .required(required)
      .when('platform', {
        is: Platform.ENGLISH,
        then: (schema) => schema.max(30, 'Max 30 characters').matches(/^\S+$/, 'No whitespace allowed'),
      }),
    nameChinese: Yup.string()
      .required(required)
      .when('platform', {
        is: Platform.ENGLISH,
        then: (schema) => schema.max(19, 'Max 19 characters').matches(/^\S+$/, 'No whitespace allowed'),
        otherwise: (schema) => schema.max(5, 'Max 5 characters'),
      }),
    transcription: Yup.string()
      .required(required)
      .when('platform', {
        is: Platform.ENGLISH,
        then: (schema) => schema.matches(/^\/.+\/$/, 'Must start and end with "/"'),
        otherwise: (schema) => schema.test(
          'pinyin-count',
          'Pinyin word count must match nameChinese length',
          function (value) {
            const nameChinese = this.parent.nameChinese || '';
            const count = value ? value.trim().split(/\s+/).filter(Boolean).length : 0;
            return count === nameChinese.length;
          },
        ),
      }),
    nameRussian: Yup.string().required(required).max(100, 'Max 100 characters'),
    definition: Yup.string()
      .required(required)
      .when('platform', {
        is: Platform.ENGLISH,
        then: (schema) => schema.matches(/^[A-Z].*\.$/, 'Must start with uppercase and end with "."'),
        otherwise: (schema) => schema.test(
          'definition-ending',
          'Must not end with .?!',
          (value) => (value ? !/[.?!]$/.test(value) : true),
        ),
      }),
    examples: Yup.array().when('platform', {
      is: Platform.CHINESE,
      then: () => examplesChinese,
      otherwise: () => examplesEnglish,
    }),
    listOfWordPackIds: Yup.array()
      .of(Yup.number().required(required))
      .min(1, 'Select at least 1')
      .max(5, 'Select up to 5')
      .required(required),
  });
};

function FormTextInput(props: {
  name: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}) {
  const { name, label, placeholder, isRequired = false, isDisabled = false } = props;
  const { errors, touched } = useFormikContext();
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <Input
            id={name}
            placeholder={placeholder}
            isDisabled={isDisabled}
            {...field}
          />
        )}
      </Field>
      {error && isTouched && <Text color={theme.colors.red['400']}>{error.toString()}</Text>}
    </FormControl>
  );
}

function FormSelect(props: {
  name: string;
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}) {
  const { name, label, children, isRequired = false, isDisabled = false } = props;
  const { errors, touched } = useFormikContext();
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <ChakraSelect id={name} isDisabled={isDisabled} {...field}>
            {children}
          </ChakraSelect>
        )}
      </Field>
      {error && isTouched && <Text color={theme.colors.red['400']}>{error.toString()}</Text>}
    </FormControl>
  );
}

function FormInlineTextInput(props: {
  name: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}) {
  const { name, label, placeholder, isRequired = false, isDisabled = false } = props;
  const { errors, touched } = useFormikContext();
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);

  return (
    <InlineFormControl isRequired={isRequired}>
      <InlineRow>
        <InlineLabel htmlFor={name}>{label}</InlineLabel>
        <Field name={name}>
          {({ field }: FieldProps) => (
            <InlineInput
              id={name}
              placeholder={placeholder}
              isDisabled={isDisabled}
              {...field}
            />
          )}
        </Field>
      </InlineRow>
      {error && isTouched && <Text color={theme.colors.red['400']}>{error.toString()}</Text>}
    </InlineFormControl>
  );
}

function WordPackMultiSelect(props: {
  name: string;
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  maxSelections?: number;
}) {
  const {
    name,
    label,
    isRequired = false,
    isDisabled = false,
    maxSelections = 5,
  } = props;
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext<WordDataFormValues>();
  const { colorMode } = useColorMode();
  const { data: wordPackPage } = useGetPageOfWordPacksQuery({
    platform: values.platform,
    page: 0,
    size: 200,
  });

  const options = useMemo(() => {
    const wordPacks = new Map<number, WordPackDto>();
    wordPackPage?.content.forEach((wordPack) => {
      if (wordPack.id != null) {
        wordPacks.set(wordPack.id, wordPack);
      }
    });
    values.listOfWordPackIds.forEach((wordPackId) => {
      if (!wordPacks.has(wordPackId)) {
        wordPacks.set(wordPackId, { id: wordPackId, name: `#${wordPackId}` } as WordPackDto);
      }
    });
    return Array.from(wordPacks.values());
  }, [values.listOfWordPackIds, wordPackPage?.content]);

  const [isOpen, setOpen] = useState(false);
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);
  const selectedCount = values.listOfWordPackIds.length;
  const isAtLimit = selectedCount >= maxSelections;
  const selectedSummary = values.listOfWordPackIds
    .map((wordPackId) => getWordPackLabelById(wordPackId, options))
    .join(', ');

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <WordPackMeta>{`Selected ${selectedCount}/${maxSelections}`}</WordPackMeta>
      <WordPackSelectWrapper
        tabIndex={0}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setOpen(false);
          }
        }}
      >
      <WordPackSelectTrigger
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`${name}-options`}
        disabled={isDisabled}
        $colorMode={colorMode}
      >
        {selectedSummary || 'Select word packs'}
        <WordPackSelectIcon aria-hidden>▾</WordPackSelectIcon>
      </WordPackSelectTrigger>
        {isOpen && (
          <WordPackOptions id={`${name}-options`} $colorMode={colorMode} role="group" aria-label={label}>
            {options.length ? (
              options.map((wordPack) => {
                const wordPackId = wordPack.id!;
                const isChecked = values.listOfWordPackIds.includes(wordPackId);
                return (
                  <Checkbox
                    key={wordPackId}
                    isChecked={isChecked}
                    isDisabled={isDisabled || (!isChecked && isAtLimit)}
                    onChange={() => {
                      setFieldTouched(name, true, false);
                      if (isChecked) {
                        setFieldValue(
                          name,
                          values.listOfWordPackIds.filter((item) => item !== wordPackId),
                        );
                        return;
                      }

                      if (isAtLimit) {
                        return;
                      }

                      setFieldValue(name, [...values.listOfWordPackIds, wordPackId]);
                    }}
                  >
                    {getWordPackLabel(wordPack)}
                  </Checkbox>
                );
              })
            ) : (
              <Text>No word packs found</Text>
            )}
          </WordPackOptions>
        )}
      </WordPackSelectWrapper>
      {error && isTouched && <Text color={theme.colors.red['400']}>{error.toString()}</Text>}
    </FormControl>
  );
}

function WordDataForm(props: {
  initialValues: WordDataFormValues;
  isEditMode: boolean;
  isSubmitting: boolean;
  onSubmit: (values: WordDataFormValues) => void;
  onCancel: () => void;
}) {
  const { initialValues, isEditMode, isSubmitting, onSubmit, onCancel } = props;
  const validationSchema = useMemo(() => createValidationSchema(), []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values }) => (
        <Form noValidate>
          <FormLayout>
            {isEditMode ? (
              <FormRow>
                <FormTextInput name="id" label="ID" isDisabled />
                <FormSelect name="platform" label="Platform" isRequired isDisabled={isEditMode}>
                  <option value={Platform.ENGLISH}>ENGLISH</option>
                  <option value={Platform.CHINESE}>CHINESE</option>
                </FormSelect>
              </FormRow>
            ) : (
              <FormRow>
                <FormSelect name="platform" label="Platform" isRequired isDisabled={isEditMode}>
                  <option value={Platform.ENGLISH}>ENGLISH</option>
                  <option value={Platform.CHINESE}>CHINESE</option>
                </FormSelect>
                <FormRowSpacer />
              </FormRow>
            )}
            {values.platform === Platform.ENGLISH ? (
              <>
                <FormRow>
                  <FormTextInput name="nameEnglish" label="Name (English)" isRequired />
                  <FormTextInput name="transcription" label="Transcription" isRequired />
                </FormRow>
                <FormRow>
                  <FormTextInput name="nameRussian" label="Name (Russian)" isRequired />
                  <FormTextInput name="nameChinese" label="Name (Chinese)" isRequired />
                </FormRow>
              </>
            ) : (
              <>
                <FormRow>
                  <FormTextInput name="nameChinese" label="Name (Chinese)" isRequired />
                  <FormTextInput name="transcription" label="Transcription" isRequired />
                </FormRow>
                <FormRow>
                  <FormTextInput name="nameRussian" label="Name (Russian)" isRequired />
                  <FormTextInput name="nameEnglish" label="Name (English)" isRequired />
                </FormRow>
              </>
            )}
            <FullWidthField>
              <FormTextInput name="definition" label="Definition" isRequired />
            </FullWidthField>
            <FullWidthField>
              <WordPackMultiSelect name="listOfWordPackIds" label="Word Pack Names" isRequired maxSelections={5} />
            </FullWidthField>
          </FormLayout>
          <ExamplesContainer>
            {values.examples.map((_, index) => (
              <ExampleRow key={index}>
                <Text>Example {index + 1}</Text>
                <ExampleFields>
                  <FormInlineTextInput name={`examples[${index}].ch`} label="ch" isRequired />
                  {values.platform === Platform.CHINESE && (
                    <FormInlineTextInput name={`examples[${index}].pinyin`} label="pinyin" isRequired />
                  )}
                  <FormInlineTextInput name={`examples[${index}].en`} label="en" isRequired />
                  <FormInlineTextInput name={`examples[${index}].ru`} label="ru" isRequired />
                </ExampleFields>
              </ExampleRow>
            ))}
          </ExamplesContainer>
          <ButtonsContainer alignRight>
            <Button buttonText="Cancel" buttonType={ButtonType.BUTTON} onClick={onCancel} isDisabled={isSubmitting} />
            <Button
              buttonText={isEditMode ? 'Update' : 'Create'}
              buttonType={ButtonType.SUBMIT}
              isDisabled={isSubmitting}
            />
          </ButtonsContainer>
        </Form>
      )}
    </Formik>
  );
}

const exampleFieldOrder = ['ch', 'pinyin', 'en', 'ru'];

const renderExampleBlock = (example: { [key: string]: string }, keyPrefix: string) => (
  <ExampleBlock key={`example-${keyPrefix}`}>
    {exampleFieldOrder
      .filter((key) => Boolean(example[key]))
      .map((key) => (
        <ExampleLine key={`${keyPrefix}-${key}`}>
          <ExampleLabel>{`${key.toUpperCase()}:`}</ExampleLabel>
          <span>{example[key]}</span>
        </ExampleLine>
      ))}
  </ExampleBlock>
);

const renderExamplesTooltip = (examples: { [key: string]: string }[]) => (
  <TooltipContent>
    <ExamplesList>
      {examples.map((example, index) => renderExampleBlock(example, `${index}`))}
    </ExamplesList>
  </TooltipContent>
);

const renderExamples = (examples: { [key: string]: string }[]) => {
  if (!examples.length) {
    return <Text>-</Text>;
  }

  return (
    <Tooltip
      label={renderExamplesTooltip(examples)}
      placement="top-start"
      hasArrow
      openDelay={300}
      aria-label="Examples list"
      maxW="max-content"
      isDisabled={!examples.length}
    >
      <ExamplesPreview>
        {renderExampleBlock(examples[0], 'preview')}
      </ExamplesPreview>
    </Tooltip>
  );
};

const renderTranslation = (lines: { label: string; value: string }[]) => (
  <TranslationList>
    {lines.map((line) => (
      <TranslationLine key={line.label}>
        <TranslationLabel>{`${line.label}:`}</TranslationLabel>
        <span>{line.value || '-'}</span>
      </TranslationLine>
    ))}
  </TranslationList>
);

const renderTranscription = (value: string) => {
  const parts = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (!parts.length) {
    return <Text>-</Text>;
  }

  return (
    <TranscriptionList>
      {parts.map((item, index) => (
        <span key={`${item}-${index}`}>{item}</span>
      ))}
    </TranscriptionList>
  );
};

const getWordPackLabel = (wordPack: WordPackDto) => wordPack.name;

const getWordPackLabelById = (wordPackId: number, wordPacks: WordPackDto[]) => {
  const wordPack = wordPacks.find((item) => item.id === wordPackId);
  return wordPack ? getWordPackLabel(wordPack) : `#${wordPackId}`;
};

export default function WordDataPageContent() {
  const { colorMode } = useColorMode();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [platform, setPlatform] = useState<Platform>(Platform.ENGLISH);
  const [query, setQuery] = useState('');
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [editingWordData, setEditingWordData] = useState<WordDataDto | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WordDataDto | null>(null);
  const isEnglishPlatform = platform === Platform.ENGLISH;
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  const { data: wordPackPage } = useGetPageOfWordPacksQuery({
    platform,
    page: 0,
    size: 200,
  });

  const { data: pageResponse } = useGetPageOfWordDataQuery({
    platform,
    page,
    size,
    query: query.trim() ? query : undefined,
  });

  const [createWordData, { isLoading: isCreating }] = useCreateWordDataMutation();
  const [updateWordData, { isLoading: isUpdating }] = useUpdateWordDataMutation();
  const [deleteWordData, { isLoading: isDeleting }] = useDeleteWordDataMutation();

  const isSubmitting = isCreating || isUpdating || isDeleting;

  if (!pageResponse) return <></>;

  const wordDataList = pageResponse.content;

  const onCreateSubmit = (values: WordDataFormValues) => {
    const payload = toWordDataPayload(values);
    createWordData(payload)
      .unwrap()
      .then(() => {
        successNotification('Word data created');
        setCreateOpen(false);
      })
      .catch((error) => errorNotification('Unable to create word data', error));
  };

  const onUpdateSubmit = (values: WordDataFormValues) => {
    if (!editingWordData) return;
    const payload = toWordDataPatchPayload(values);
    updateWordData({ id: editingWordData.id, payload })
      .unwrap()
      .then(() => {
        successNotification('Word data updated');
        setEditingWordData(null);
      })
      .catch((error) => errorNotification('Unable to update word data', error));
  };

  const onDelete = () => {
    if (!deleteTarget) return;
    deleteWordData(deleteTarget.id)
      .unwrap()
      .then(() => {
        successNotification('Word data deleted');
        setDeleteTarget(null);
      })
      .catch((error) => errorNotification('Unable to delete word data', error));
  };

  return (
    <Container>
      <Heading>Daily Lexika - Word Data</Heading>
      <FiltersRow>
        <PlatformFilterItem>
          <ChakraSelect
            id="word-data-platform"
            aria-label="Platform"
            value={platform}
            onChange={(event) => {
              setPage(0);
              setPlatform(event.target.value as Platform);
            }}
          >
            <option value={Platform.ENGLISH}>ENGLISH</option>
            <option value={Platform.CHINESE}>CHINESE</option>
          </ChakraSelect>
        </PlatformFilterItem>
        <FilterItem>
          <Input
            id="word-data-query"
            aria-label="Search"
            value={query}
            onChange={(event) => {
              setPage(0);
              setQuery(event.target.value);
            }}
            placeholder="Start typing a word..."
          />
        </FilterItem>
        {!isMobile && (
          <ActionItem>
            <Button
              buttonText="Add New Word Data"
              buttonType={ButtonType.BUTTON}
              onClick={() => setCreateOpen(true)}
            />
          </ActionItem>
        )}
      </FiltersRow>
      <TablePagesPanel
        pageResponse={pageResponse}
        setPage={setPage}
        setSize={setSize}
      />
      <TableScrollContainer>
        <TableStyled variant="simple">
          <StickyThead $colorMode={colorMode}>
            <Tr>
              {isEnglishPlatform ? (
                <>
                  <Th>Name (English)</Th>
                  <Th>Transcription</Th>
                  <Th>Translation</Th>
                  <Th>Definition</Th>
                  <Th>Examples</Th>
                  <Th>Word Pack Names</Th>
                  {!isMobile && <StickyRightHeader $colorMode={colorMode}>Actions</StickyRightHeader>}
                </>
              ) : (
                <>
                  <Th>Name (Chinese)</Th>
                  <Th>Transcription</Th>
                  <Th>Translation</Th>
                  <Th>Definition</Th>
                  <Th>Examples</Th>
                  <Th>Word Pack Names</Th>
                  {!isMobile && <StickyRightHeader $colorMode={colorMode}>Actions</StickyRightHeader>}
                </>
              )}
            </Tr>
          </StickyThead>
          <Tbody>
            {wordDataList.length === 0 ? (
              <Tr>
                <Td colSpan={isMobile ? 6 : 7}>
                  <Text>No results</Text>
                </Td>
              </Tr>
            ) : (
              wordDataList.map((wordData) => (
                isEnglishPlatform ? (
                  <Tr key={wordData.id}>
                    <Td>
                      <Text>{wordData.nameEnglish}</Text>
                      <MetaText>{`ID: ${wordData.id}`}</MetaText>
                    </Td>
                    <TranscriptionCell>{renderTranscription(wordData.transcription)}</TranscriptionCell>
                    <TranslationCell>
                      {renderTranslation([
                        { label: 'RU', value: wordData.nameRussian },
                        { label: 'CH', value: wordData.nameChinese },
                      ])}
                    </TranslationCell>
                    <DefinitionCell>{wordData.definition}</DefinitionCell>
                    <ExamplesCell>{renderExamples(wordData.examples)}</ExamplesCell>
                    <WordPackNamesCell>
                      <WordPackNamesList>
                        {wordData.listOfWordPackIds.map((id) => (
                          <span key={id}>{getWordPackLabelById(id, wordPackPage?.content ?? [])}</span>
                        ))}
                      </WordPackNamesList>
                    </WordPackNamesCell>
                    {!isMobile && (
                      <StickyRightCell $colorMode={colorMode}>
                        <RowActions>
                          <ButtonWithIcon
                            type={ButtonWithIconType.CHANGE}
                            onClick={() => setEditingWordData(wordData)}
                          />
                          <ButtonWithIcon
                            type={ButtonWithIconType.DELETE}
                            onClick={() => setDeleteTarget(wordData)}
                          />
                        </RowActions>
                      </StickyRightCell>
                    )}
                  </Tr>
                ) : (
                  <Tr key={wordData.id}>
                    <Td>
                      <Text>{wordData.nameChinese}</Text>
                      <MetaText>{`ID: ${wordData.id}`}</MetaText>
                    </Td>
                    <TranscriptionCell>{renderTranscription(wordData.transcription)}</TranscriptionCell>
                    <TranslationCell>
                      {renderTranslation([
                        { label: 'EN', value: wordData.nameEnglish },
                        { label: 'RU', value: wordData.nameRussian },
                      ])}
                    </TranslationCell>
                    <DefinitionCell>{wordData.definition}</DefinitionCell>
                    <ExamplesCell>{renderExamples(wordData.examples)}</ExamplesCell>
                    <WordPackNamesCell>
                      <WordPackNamesList>
                        {wordData.listOfWordPackIds.map((id) => (
                          <span key={id}>{getWordPackLabelById(id, wordPackPage?.content ?? [])}</span>
                        ))}
                      </WordPackNamesList>
                    </WordPackNamesCell>
                    {!isMobile && (
                      <StickyRightCell $colorMode={colorMode}>
                        <RowActions>
                          <ButtonWithIcon
                            type={ButtonWithIconType.CHANGE}
                            onClick={() => setEditingWordData(wordData)}
                          />
                          <ButtonWithIcon
                            type={ButtonWithIconType.DELETE}
                            onClick={() => setDeleteTarget(wordData)}
                          />
                        </RowActions>
                      </StickyRightCell>
                    )}
                  </Tr>
                )
              ))
            )}
          </Tbody>
        </TableStyled>
      </TableScrollContainer>

      <Modal
        header="Create Word Data"
        body={
          <WordDataForm
            initialValues={buildInitialValues(platform)}
            isEditMode={false}
            isSubmitting={isSubmitting}
            onSubmit={onCreateSubmit}
            onCancel={() => setCreateOpen(false)}
          />
        }
        width="1000px"
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
      />

      <Modal
        header="Edit Word Data"
        body={
          editingWordData ? (
            <WordDataForm
              initialValues={buildInitialValues(
                editingWordData.platform,
                editingWordData
              )}
              isEditMode
              isSubmitting={isSubmitting}
              onSubmit={onUpdateSubmit}
              onCancel={() => setEditingWordData(null)}
            />
          ) : null
        }
        width="1000px"
        isOpen={Boolean(editingWordData)}
        onClose={() => setEditingWordData(null)}
      />

      <AlertDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        handleDelete={onDelete}
        header="Delete word data?"
        body="This action cannot be undone."
        cancelButtonText="Cancel"
        deleteButtonText="Delete"
        isButtonDisabled={isSubmitting}
        width="450px"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  max-width: 100%;
`;

const PlatformFilterItem = styled(FilterItem)`
  width: 130px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
`;

const RowActions = styled.div`
  display: flex;
  gap: 10px;
`;

const TableScrollContainer = styled(TableContainer)`
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  height: 60vh;
  max-height: 60vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  && {
    overflow-x: auto;
    overflow-y: auto;
  }
`;

const TableStyled = styled(Table)`
  display: inline-table;
  width: max-content;
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  & th,
  & td {
    padding-left: 12px;
    padding-right: 12px;
  }
`;

const StickyThead = styled(Thead)<{ $colorMode: ColorMode }>`
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};

  & th {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

const StickyRightHeader = styled(Th)<{ $colorMode: ColorMode }>`
  position: sticky;
  right: 0;
  top: 0;
  z-index: 2;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
  background-clip: padding-box;
`;

const StickyRightCell = styled(Td)<{ $colorMode: ColorMode }>`
  position: sticky;
  right: 0;
  z-index: 1;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
`;

const DefinitionCell = styled(Td)`
  width: 350px;
  min-width: 350px;
  max-width: 350px;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const ExamplesCell = styled(Td)`
  width: 450px;
  min-width: 450px;
  max-width: 450px;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const TranslationCell = styled(Td)`
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const TranscriptionCell = styled(Td)`
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const TranscriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const WordPackNamesCell = styled(Td)`
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const MetaText = styled(Text)`
  opacity: 0.6;
  font-size: 12px;
`;

const ExamplesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ExamplesPreview = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const TooltipContent = styled.div`
  width: max-content;
`;

const ExampleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ExampleLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ExampleLabel = styled.span`
  font-weight: 600;
`;

const TranslationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TranslationLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TranslationLabel = styled.span`
  font-weight: 600;
`;

const WordPackNamesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(240px, 1fr));
  gap: 16px;
`;

const FormRowSpacer = styled.div`
  min-height: 1px;
`;

const FullWidthField = styled.div`
  width: 100%;
`;

const ExamplesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const ExampleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExampleFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InlineFormControl = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InlineRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InlineLabel = styled(FormLabel)`
  margin-bottom: 0;
  min-width: 36px;
`;

const InlineInput = styled(Input)`
  flex: 1;
`;

const WordPackMeta = styled(Text)`
  margin-bottom: 8px;
  font-size: 12px;
  opacity: 0.7;
`;

const WordPackSelectWrapper = styled.div`
  position: relative;
`;

const WordPackSelectTrigger = styled.button<{ $colorMode: ColorMode }>`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 38px;
  padding: 6px 12px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-color: ${({ $colorMode }) => theme.colors[$colorMode].borderColorMain};
  border-radius: ${theme.stylesToDelete.borderRadius};
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
  text-align: left;
  cursor: pointer;
  gap: 8px;
  justify-content: space-between;
`;

const WordPackSelectIcon = styled.span`
  font-size: 12px;
  opacity: 0.6;
`;

const WordPackOptions = styled.div<{ $colorMode: ColorMode }>`
  position: absolute;
  z-index: 2;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px 12px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-color: ${({ $colorMode }) => theme.colors[$colorMode].borderColorMain};
  border-radius: ${theme.stylesToDelete.borderRadius};
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
`;
