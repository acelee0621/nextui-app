"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spacer,
  Button,
  Textarea,
  useDisclosure,
  Input,
  Chip,
  Divider,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import { FileUp, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { Topic } from "@/util/type";
import Topics from "./components/Topics";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [currentOption, setCurrentOption] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [topics, setTopics] = useState<Topic[]>([]);

  const { userId } = useAuth();
  const avatar = useUser().user?.imageUrl;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${process.env.API_ADDRESS}/topic`, {
        cache: "no-cache",
        method: "GET",
      });
      const data = await result.json();
      setTopics(data.topics as Topic[]);
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="w-full h-14 ">
        <div className="fixed top-4 right-8 flex justify-stretch items-center">
          <Button color="success" endContent={<Send />} onPress={onOpen}>
            Post
          </Button>
          <Spacer x={4} />
          <UserButton />
          <Spacer x={4} />
          <ThemeSwitcher />
        </div>
      </header>
      <div className="flex justify-center items-center m-4">
        <main className="flex flex-col items-center justify-center w-full border-x-2 sm:w-full md:w-9/12 lg:w-6/12">
          <Divider className="my-5" />
          {topics &&
            topics.map((item) => {
              return <Topics {...item} key={item.id} />;
            })}
        </main>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">
                Post Topic
              </ModalHeader>
              <ModalBody>
                <Textarea
                  label="Content"
                  placeholder="Enter your Topic Content"
                  variant="underlined"
                  labelPlacement="outside"
                  value={content}
                  onValueChange={setContent}
                />
                <Spacer x={2} />
                <CldUploadButton
                  uploadPreset="lvjsfdl7"
                  onSuccess={(result) => {
                    // @ts-expect-error data-upload
                    setImages([...images, result.info.url]);
                  }}
                >
                  <button className="bg-secondary-500 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-md">
                    <div className="flex ">
                      <FileUp />
                      <span>Upload Image</span>
                    </div>
                  </button>
                </CldUploadButton>
                <Spacer x={2} />
                <div className="flex items-center">
                  <Input
                    label={"Options"}
                    variant={"faded"}
                    size="sm"
                    value={currentOption}
                    onValueChange={setCurrentOption}
                  />
                  <Spacer y={2} />
                  <Button
                    color="success"
                    onClick={() => {
                      setOptions([...options, currentOption]);
                      setCurrentOption("");
                    }}
                  >
                    Add Option
                  </Button>
                </div>
                <Spacer x={2} />
                <div className="flex gap-2">
                  {options.map((item, index) => {
                    return (
                      <Chip
                        key={index}
                        onClose={(event) => {
                          setOptions(options.filter((i) => i !== item));
                        }}
                        variant="flat"
                      >
                        {item}
                      </Chip>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={async () => {
                    const result = await fetch(
                      process.env.API_ADDRESS + "/topic",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          userId,
                          avatar,
                          content,
                          images,
                          options,
                        }),
                      }
                    );
                    const data = (await result.json()) as Topic;
                    setTopics([...topics, data]);
                    setContent("");
                    setImages([]);
                    setOptions([]);
                    setCurrentOption("");
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
