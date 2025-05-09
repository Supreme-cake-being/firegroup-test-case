import { useContext } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { DeleteButton } from "@/src/components/IconButtons";
import { Loader } from "@/src/components/Loader";
import { useBlogDelete } from "@/src/hooks/useBlogDelete";
import { HandleFetchContext } from "@/src/contexts/handleFecthContext";

interface IDeleteModal {
  id: string;
  title: string;
}

export const DeleteModal = ({ id, title }: IDeleteModal) => {
  const handleFetch = useContext(HandleFetchContext);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { loading, handleDelete } = useBlogDelete();

  return (
    <>
      <DeleteButton text="Delete post" onPress={onOpen} />
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete {title}
              </ModalHeader>
              <ModalBody>
                <h4>Are you sure you want to delete {title}</h4>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={async () => {
                    await handleDelete(id);
                    await handleFetch();
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {loading && <Loader />}
    </>
  );
};
