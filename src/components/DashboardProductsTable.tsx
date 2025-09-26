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
} from "@chakra-ui/react";
import { useDeleteDashboardProductsMutation, useGetDashboardProductsQuery } from "../app/services/product";
import TableSkeleton from "./TableSkeleton";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import CustomAlertDialog from "../Shared/AlertDialog";
interface IProduct {
  documentId: number;
  title: string;
  description: string;
  category: Array<{ title: string }>;
  stock: number;
  image: {
    url: string;
  };
  price: number;
}

const DashboardProductsTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  const [destoryProduct , {isLoading : isDestroying ,isSuccess }] = useDeleteDashboardProductsMutation()

  console.log({ data, error });
  if (isLoading) return <TableSkeleton />;
console.log(isDestroying);
console.log(isSuccess);


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
            {data?.data?.map((item: IProduct) => (
              <Tr key={item.documentId}>
                <Td>{item.documentId}</Td>
                <Td>{item.title}</Td>
                {/* <Td whiteSpace="normal" wordBreak='break-word'>{item.description.slice(0,100)}</Td> */}
                <Td>{item.category[0]?.title || "N/A"}</Td>
                <Td>{item.stock}</Td>
                <Td>
                  <Img
                    w={"100px"}
                    src={`${import.meta.env.VITE_SERVER_URL}${item.image.url}`}
                    alt={item.title}
                  />
                </Td>
                <Td textAlign="end" fontWeight="semibold" color="green.600">
                  ${item.price.toFixed(2)}
                </Td>
                <Td>
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
                  <Button
                    colorScheme="red"
                    variant={"solid"}
                    mr={3}
                    onClick={onOpen}
                  >
                    <BsTrash />
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant={"solid"}
                    onClick={() => {}}
                  >
                    <FiEdit2 />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={""}
        description={
          "Do you really want to delete this product? this product cannot be undone "
        }
        okTxt={"OK"}
        cancelTxt={"cancel"}
        onOkHandler={()=>destoryProduct('a2nyns5hbr552bxb72awahp5')}
      />
    </>
  );
};
export default DashboardProductsTable;
