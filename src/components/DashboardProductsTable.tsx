import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Td,
  Img,
  Button,
  useDisclosure,
  Tooltip,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Box,
} from "@chakra-ui/react";
import {
  useDeleteDashboardProductsMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductsMutation,
} from "../app/services/product";
import TableSkeleton from "./TableSkeleton";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import CustomAlertDialog from "../Shared/AlertDialog";
import { useEffect, useState, type ChangeEvent } from "react";
import CustomModel from "../Shared/Model";
import { selectNetwork } from "../app/features/networkSlice";
import { useSelector } from "react-redux";
import type IProduct from "../types/IProduct";

const DashboardProductsTable = () => {
  const {isOnline} = useSelector(selectNetwork) 
  const [clickedProductId, setClickedProductId] = useState<number | null>(null);
  const [productToEdit, setProductToEdit] = useState<IProduct>({
    documentId: 0,
    title: "",
    description: "",
    category: [],
    createdAt: "", 
    stock: 0,
    thumbnail: {formats: {thumbnail : {url : ''}}},
    price: 0,
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModelOpen,
    onOpen: OnModelOpen,
    onClose: onModelClose,
  } = useDisclosure();

  const { isLoading, data } = useGetDashboardProductsQuery({ page: 1 });
  const [destoryProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteDashboardProductsMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSucces },
  ] = useUpdateDashboardProductsMutation();

  const onSubmitHandler = (
    // e: React.FormEvent<HTMLFormElement>
  ) => {
    // e.preventDefault();
    console.log("Submitting product:", productToEdit, thumbnail);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        description: productToEdit.description,
        stock: productToEdit.stock,
        price: productToEdit.price,
      })
    );
    if (thumbnail) {
      formData.append("files.image", thumbnail);
    }
  
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: File →`, value.name, value.type, value.size);
    } else {
      console.log(`${key}:`, value);
    }
  }

    updateProduct({ id: clickedProductId, body: formData });
    console.log(formData);

  };
  

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
  };
  const onNumberChangeHandler = (
    name: keyof IProduct,
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setProductToEdit({
      ...productToEdit,
      [name]: valueAsNumber,
    });
  };

  const onChangeThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }

    if (isUpdatingSucces) {
      setClickedProductId(null);
      onModelClose();
    }
  }, [isSuccess, isUpdatingSucces , onModelClose , onClose]);

  if (isLoading || !isOnline) return <TableSkeleton />;

  return (
    <>
      <TableContainer borderWidth="1px" maxW="full">
        <Table size="sm" variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th minW="50px">ID</Th>
              <Th minW="50px">TITLE</Th>
              {/* <Th minW="50px">DESCRIBTION</Th> */}
              <Th minW="50px">CATEGORY</Th>
              <Th minW="50px">STOCK</Th>
              <Th minW="50px">Images</Th>
              <Th minW="50px" textAlign="end">
                Price
              </Th>
              <Th textAlign={"center"}>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((item: IProduct) => (
              <Tr key={item.documentId}>
                <Td>{item.documentId}</Td>
                <Td>{item.title}</Td>
                {/* <Td whiteSpace="normal" wordBreak='break-word'>{item.description.slice(0,100)}</Td> */}
                <Td>
                  {" "}
                  {item.category?.map((c) => c.title).join(", ") || "N/A"}{" "}
                </Td>
                <Td>{item.stock}</Td>
                <Td>
                  <Img
                    w={"100px"}
                    h={"50px"}
                    src={item.thumbnail.formats.thumbnail.url}
                    alt={item.title}
                  />
                </Td>
                <Td textAlign="end" fontWeight="semibold" color="green.600">
                  ${item.price.toFixed(2)}
                </Td>
                <Td>
                  <Tooltip label="View">
                    <Button
                      as={Link}
                      to={`/products/${item.documentId}`}
                      colorScheme="purple"
                      variant={"solid"}
                      mr={"10px"}
                      onClick={() => {}}
                    >
                      <AiOutlineEye />
                    </Button>
                  </Tooltip>

                  <Tooltip label="DELETE">
                    <Button
                      colorScheme="red"
                      variant={"solid"}
                      mr={3}
                      onClick={() => {
                        setClickedProductId(item.documentId);
                        onOpen();
                      }}
                    >
                      <BsTrash />
                    </Button>
                  </Tooltip>
                  <Tooltip label="EDIT">
                    <Button
                      colorScheme="blue"
                      variant={"solid"}
                      onClick={() => {
                        setClickedProductId(item.documentId);
                        setProductToEdit(item);
                        OnModelOpen();
                      }}
                    >
                      <FiEdit2 />
                    </Button>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title={""}
        description={
          "Do you really want to delete this product? this product cannot be undone "
        }
        okTxt={"OK"}
        cancelTxt={"cancel"}
        onOkHandler={() => {
          if (clickedProductId !== null) destoryProduct(clickedProductId);
        }}
        isLoading={isDestroying}
      />

      <CustomModel
        isOpen={isModelOpen}
        onClose={onModelClose}
        title={"Update Product"}
        okTxt="Update"
        isLoading={isUpdating}
        onOKClick={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}

        >
        <Box as='form' onSubmit={onSubmitHandler}>

          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              placeholder="First name"
              value={productToEdit?.title}
              onChange={onChangeHandler}
            />
          </FormControl>

          <FormControl my={3}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Here is a sample placeholder"
              value={productToEdit?.description}
              onChange={onChangeHandler}
            />
          </FormControl>

          <FormControl my={3}>
            <FormLabel>Price</FormLabel>
            <NumberInput
              name="price"
              defaultValue={productToEdit?.price}
              precision={2}
              step={0.2}
              onChange={(valStr, valNum) =>
                onNumberChangeHandler("price", valStr, valNum)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl my={3}>
            <FormLabel>Stock</FormLabel>
            <NumberInput
              defaultValue={productToEdit?.stock}
              precision={2}
              step={0.2}
              onChange={(valStr, valNum) =>
                onNumberChangeHandler("stock", valStr, valNum)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <Input
              id="thumbnail"
              type="file"
              h={"full"}
              p={2}
              accept="image/png, image/gif , image/jpeg"
              onChange={onChangeThumbnailHandler}
            />
          </FormControl>
          </Box>

      </CustomModel>
    </>
  );
};
export default DashboardProductsTable;
