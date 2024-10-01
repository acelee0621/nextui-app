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
  Navbar,
  NavbarItem,
  NavbarContent,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { UserButton, useUser } from "@clerk/nextjs";
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

  // const avatar = useUser().user?.imageUrl;
  const { isLoaded, isSignedIn, user } = useUser();

  const storeToDatabase = async () => {
    if (isLoaded && isSignedIn) {
      const result = await fetch(process.env.API_ADDRESS + "/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          username: user?.username,
          avatar: user?.imageUrl,
          fullName: user?.fullName,
        }),
      });
      await result.json();
    }
  };

  useEffect(() => {
    storeToDatabase();
  });

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
      <Navbar>
        <NavbarContent className="fixed right-8 flex items-center justify-stretch">
          <NavbarItem>
            <Button color="success" endContent={<Send />} onPress={onOpen}>
              Post
            </Button>
          </NavbarItem>
          <NavbarItem className="mt-2">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                },
              }}
            />
          </NavbarItem>
          <NavbarItem className="mt-1">
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="m-4 flex items-center justify-center">
        <main className="flex w-full flex-col items-center justify-center border-x-2 sm:w-full md:w-9/12 lg:w-6/12">
          <Spacer y={4} />
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
                  <button className="rounded-md bg-secondary-500 px-4 py-2 font-bold text-white hover:bg-secondary-700">
                    <div className="flex">
                      <FileUp />
                      <span>Upload Image</span>
                    </div>
                  </button>
                </CldUploadButton>
                <Spacer x={2} />
                <div className="flex items-center">
                  <Input
                    label={"Tags"}
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
                    Add Tags
                  </Button>
                </div>
                <Spacer x={2} />
                <div className="flex gap-2">
                  {options.map((item, index) => {
                    return (
                      <Chip
                        key={index}
                        onClose={() => {
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
                          username: user?.username,
                          fullName: user?.fullName,
                          avatar: user?.imageUrl,
                          content,
                          images,
                          options,
                        }),
                      },
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
