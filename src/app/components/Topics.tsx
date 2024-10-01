"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  User,
  CardFooter,
  Chip,
  Spacer,
  Textarea,
} from "@nextui-org/react";

import { CheckIcon } from "./CheckIcon";

interface Props {
  id?: string;
  userId?: string;
  fullName?: string;
  avatar?: string;
  content?: string;
  images?: string[];
  options?: Array<{ key: string }>;
}

const Topics = (props: Props) => {
  return (
    <div className="w-10/12">
      <Card>
        <CardHeader className="flex-row items-start px-4 pb-0 pt-2">
          <User
            name={props.fullName}
            // description="Product Designer"
            avatarProps={{
              src: props.avatar,
            }}
          />
        </CardHeader>
        <CardBody className="overflow-visible px-6 py-2">
          {props.images &&
            props.images.map((item, index) => (
              <Image
                key={index}
                alt="Card Image"
                className="my-1 rounded-xl object-cover"
                src={item}
                // width={400}
              />
            ))}
          <Spacer y={3} />
          {/* <p className="text-tiny font-semibold">{props.content}</p> */}
          <Textarea
            isReadOnly
            // label="Description"
            variant="bordered"
            // labelPlacement="outside"
            // placeholder="Enter your description"
            defaultValue={props.content}
            minRows={1}
            className="w-full"
          />
        </CardBody>
        <CardFooter className="flex flex-col justify-center px-4 py-2">
          <div className="flex gap-2">
            {props.options?.map((item, index) => {
              return (
                <Chip
                  key={index}
                  variant="flat"
                  startContent={<CheckIcon size={18} />}
                >
                  {item.key}
                </Chip>
              );
            })}
          </div>
        </CardFooter>
      </Card>
      <Spacer y={10} />
    </div>
  );
};

export default Topics;
