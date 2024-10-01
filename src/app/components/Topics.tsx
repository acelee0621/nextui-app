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
  options?: Array<{ key: string;}>;
}

const Topics = (props: Props) => {  

  return (
    <div className="w-10/12 ">
      <Card>
        <CardHeader className="pb-0 pt-2 px-4 flex-row items-start">
          <User
            name={props.fullName}
            // description="Product Designer"
            avatarProps={{
              src: props.avatar,
            }}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2 px-6">
          {props.images &&
            props.images.map((item, index) => (
              <Image
                key={index}
                alt="Card Image"
                className="rounded-xl my-1 object-cover"
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
        <CardFooter className="px-4 py-2 flex flex-col justify-center">
          <div className="flex gap-2">
            {props.options.map((item, index) => {
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
