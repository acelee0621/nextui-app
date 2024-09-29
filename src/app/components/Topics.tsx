"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Avatar,
  Divider,
  CardFooter,
  RadioGroup,
  Radio,
  cn,
} from "@nextui-org/react";
import { useState } from "react";

interface Props {
  id?: string;
  userId?: string;
  avatar?: string;
  content?: string;
  images?: string[];
  options?: Array<{ key: string; value: number }>;
}

const Topics = (props: Props) => {
  const [selectedChoice, setSelectedChoice] = useState("");

  return (
    <div className="w-10/12 ">
      <Card>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <Avatar src={props.avatar} />
          <h4 className="text-lg font-bold">{props.userId}</h4>
          <p className="text-tiny font-semibold">{props.content}</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          {props.images &&
            props.images.map((item, index) => (
              <Image
                key={index}
                alt="Card Image"
                className="rounded-xl my-1 object-cover"
                src={item}
                width={400}
              />
            ))}
        </CardBody>
        <CardFooter className="px-4 py-2 flex flex-col justify-center">
          <RadioGroup
            orientation="horizontal"
            value={selectedChoice}
            onValueChange={(value) => {
              setSelectedChoice(value);
            }}
          >
            {props.options.map((item) => {
              return (
                <Radio
                  key={item.key}
                  value={item.key}
                  className={cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                  )}
                >
                  {item.key}
                </Radio>
              );
            })}
          </RadioGroup>
        </CardFooter>
      </Card>
      <Divider className="my-5" />
    </div>
  );
};

export default Topics;
