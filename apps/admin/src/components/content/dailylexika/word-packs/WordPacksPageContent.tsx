import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Field, FieldProps, Form, Formik, getIn, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { ColorMode, FormControl, FormLabel, Select as ChakraSelect, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useCreateWordPackMutation, useDeleteWordPackMutation, useGetPageOfWordPacksQuery, useUpdateWordPackMutation } from '@admin/store/api/dailyLexikaWordPackAPI';
import { Category, Platform, WordPackCreateDto, WordPackDto, WordPackPatchDto } from '@library/daily-lexika';
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
import { theme } from '@library/shared/utils';

type WordPackFormValues = {
  name: string;
  descriptionEn: string;
  descriptionRu: string;
  descriptionCh: string;
  category: Category;
  platform: Platform;
};

const descriptionLanguages = ['EN', 'RU', 'CH'];

const renderDescriptionRows = (description: string) => {
  const parts = description.split('\n');
  return (
    <DescriptionList>
      {parts.map((part, index) => (
        <DescriptionLine key={`desc-${index}`}>
          <DescriptionLabel>{`${descriptionLanguages[index] || `Lang${index + 1}`}:`}</DescriptionLabel>
          <span>{part}</span>
        </DescriptionLine>
      ))}
    </DescriptionList>
  );
};
const availableCategories = Object.values(Category).filter((value) => value !== Category.CUSTOM);

const buildInitialValues = (platform: Platform, wordPack?: WordPackDto): WordPackFormValues => {
  const parts = wordPack?.description ? wordPack.description.split('\n') : [];
  return {
    name: wordPack ? wordPack.name : '',
    descriptionEn: parts[0] || '',
    descriptionRu: parts[1] || '',
    descriptionCh: parts[2] || '',
    category: wordPack?.category || availableCategories[0],
    platform: wordPack?.platform || platform,
  };
};

const createValidationSchema = () => Yup.object({
  name: Yup.string().required('Required'),
  descriptionEn: Yup.string().required('Required'),
  descriptionRu: Yup.string().required('Required'),
  descriptionCh: Yup.string().required('Required'),
  category: Yup.mixed<Category>()
    .required('Required')
    .test('not-custom', 'CUSTOM is not allowed', (value) => value !== Category.CUSTOM),
  platform: Yup.mixed<Platform>().required('Required'),
});

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

function WordPackForm(props: {
  initialValues: WordPackFormValues;
  isEditMode: boolean;
  isSubmitting: boolean;
  onSubmit: (values: WordPackFormValues) => void;
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
      {() => (
        <Form noValidate>
          <FormGrid>
            <FormTextInput name="name" label="Name" isRequired isDisabled={isEditMode} />
            <FormSelect name="category" label="Category" isRequired>
              {availableCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FormSelect>
            <FormSelect name="platform" label="Platform" isRequired isDisabled={isEditMode}>
              <option value={Platform.ENGLISH}>ENGLISH</option>
              <option value={Platform.CHINESE}>CHINESE</option>
            </FormSelect>
          </FormGrid>
          <DescriptionSection>
            <FormLabel>Description</FormLabel>
            <DescriptionFields>
              <FormInlineTextInput name="descriptionEn" label="EN" isRequired />
              <FormInlineTextInput name="descriptionRu" label="RU" isRequired />
              <FormInlineTextInput name="descriptionCh" label="CH" isRequired />
            </DescriptionFields>
          </DescriptionSection>
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

export default function WordPacksPageContent() {
  const { colorMode } = useColorMode();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [platform, setPlatform] = useState<Platform>(Platform.ENGLISH);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [editingWordPack, setEditingWordPack] = useState<WordPackDto | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WordPackDto | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  const { data: pageResponse } = useGetPageOfWordPacksQuery({ platform, page, size });

  const [createWordPack, { isLoading: isCreating }] = useCreateWordPackMutation();
  const [updateWordPack, { isLoading: isUpdating }] = useUpdateWordPackMutation();
  const [deleteWordPack, { isLoading: isDeleting }] = useDeleteWordPackMutation();

  const isSubmitting = isCreating || isUpdating || isDeleting;

  if (!pageResponse) return <></>;

  const wordPacks = pageResponse.content;

  const onCreateSubmit = (values: WordPackFormValues) => {
    const description = [values.descriptionEn, values.descriptionRu, values.descriptionCh]
      .map((value) => value.trim())
      .join('\n');
    const payload: WordPackCreateDto = {
      name: values.name.trim(),
      description,
      category: values.category,
      platform: values.platform,
    };
    createWordPack(payload)
      .unwrap()
      .then(() => {
        successNotification('Word pack created');
        setCreateOpen(false);
      })
      .catch((error) => errorNotification('Unable to create word pack', error));
  };

  const onUpdateSubmit = (values: WordPackFormValues) => {
    if (!editingWordPack) return;
    const description = [values.descriptionEn, values.descriptionRu, values.descriptionCh]
      .map((value) => value.trim())
      .join('\n');
    const payload: WordPackPatchDto = {
      description,
      category: values.category,
    };
    updateWordPack({ id: editingWordPack.id!, payload })
      .unwrap()
      .then(() => {
        successNotification('Word pack updated');
        setEditingWordPack(null);
      })
      .catch((error) => errorNotification('Unable to update word pack', error));
  };

  const onDelete = () => {
    if (!deleteTarget) return;
    deleteWordPack(deleteTarget.id!)
      .unwrap()
      .then(() => {
        successNotification('Word pack deleted');
        setDeleteTarget(null);
      })
      .catch((error) => errorNotification('Unable to delete word pack', error));
  };

  return (
    <Container>
      <Heading>Daily Lexika - Word Packs</Heading>
      <FiltersRow>
        <PlatformFilterItem>
          <ChakraSelect
            id="word-packs-platform"
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
        {!isMobile && (
          <ActionItem>
            <Button
              buttonText="Add New Word Pack"
              buttonType={ButtonType.BUTTON}
              onClick={() => setCreateOpen(true)}
            />
          </ActionItem>
        )}
      </FiltersRow>
      <TablePagesPanel pageResponse={pageResponse} setPage={setPage} setSize={setSize} />
      <TableScrollContainer>
        <TableStyled variant="simple">
          <StickyThead $colorMode={colorMode}>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              {!isMobile && <StickyRightHeader $colorMode={colorMode}>Actions</StickyRightHeader>}
            </Tr>
          </StickyThead>
          <Tbody>
            {wordPacks.length === 0 ? (
              <Tr>
                <Td colSpan={isMobile ? 3 : 4}>
                  <Text>No results</Text>
                </Td>
              </Tr>
            ) : (
              wordPacks.map((wordPack) => (
                <Tr key={wordPack.id ?? wordPack.name}>
                  <Td>
                    <Text>{wordPack.name}</Text>
                  </Td>
                  <Td>{wordPack.category}</Td>
                  <Td>{renderDescriptionRows(wordPack.description)}</Td>
                  {!isMobile && (
                    <StickyRightCell $colorMode={colorMode}>
                      <RowActions>
                        <ButtonWithIcon
                          type={ButtonWithIconType.CHANGE}
                          onClick={() => setEditingWordPack(wordPack)}
                        />
                        <ButtonWithIcon
                          type={ButtonWithIconType.DELETE}
                          onClick={() => setDeleteTarget(wordPack)}
                        />
                      </RowActions>
                    </StickyRightCell>
                  )}
                </Tr>
              ))
            )}
          </Tbody>
        </TableStyled>
      </TableScrollContainer>

      <Modal
        header="Create Word Pack"
        body={(
          <WordPackForm
            initialValues={buildInitialValues(platform)}
            isEditMode={false}
            isSubmitting={isSubmitting}
            onSubmit={onCreateSubmit}
            onCancel={() => setCreateOpen(false)}
          />
        )}
        width="1000px"
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
      />

      <Modal
        header="Edit Word Pack"
        body={editingWordPack ? (
          <WordPackForm
            initialValues={buildInitialValues(editingWordPack.platform, editingWordPack)}
            isEditMode
            isSubmitting={isSubmitting}
            onSubmit={onUpdateSubmit}
            onCancel={() => setEditingWordPack(null)}
          />
        ) : null}
        width="1000px"
        isOpen={Boolean(editingWordPack)}
        onClose={() => setEditingWordPack(null)}
      />

      <AlertDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        handleDelete={onDelete}
        header="Delete word pack?"
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
  width: 280px;
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const DescriptionFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
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

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const DescriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DescriptionLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const DescriptionLabel = styled.span`
  font-weight: 600;
`;
