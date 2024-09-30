import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface RecordRequest {
    userId: string;
    topicId: string;
    choice?: string;
}

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
   const {searchParams} = new URL(request.url);
   const record = await prisma.record.findFirst({
    where:{
        userId: searchParams.get('userId') ?? "",
        topicId: searchParams.get('topicId')?? ""
    }
   });
   if(!record) {
       return NextResponse.json({message: 'Record not found'}, {status: 404});
   }
   return NextResponse.json({record}, {status:200});
};

export async function POST(request:NextRequest) {
    try {
       const {userId, topicId, choice} = (await request.json()) as RecordRequest;
        if(!userId || !topicId || !choice) {
            return NextResponse.json({
                message: 'Missing required fields'
            }, {status: 400})
        }

        let record;

        await prisma.$transaction(async (prisma) => {
           const oldRecord = await prisma.record.findFirst({
                where: {
                    topicId:topicId,
                    userId: userId
                }
            });
            if(oldRecord) {
                const topic = await prisma.topic.findUnique({
                    where: {
                        id: topicId,                        
                    },
                    include: {
                        options: true
                    }
                });
                const selectedOption = topic?.options.find(
                    option => option.key === oldRecord.choice
                )
                await prisma.option.update({
                    where: {
                        id: selectedOption?.id
                    },
                    data: {
                        value: selectedOption!.value - 1
                    }
                });
                await prisma.record.delete({
                    where: {
                        id:oldRecord.id,
                    }
                });
            }
            const topic = await prisma.topic.findUnique({
                where: {
                    id: topicId,
                },
                include: {
                    options: true
                }
            });
            const selectedOption = topic?.options.find(
                option => option.key === choice
            );
            await prisma.option.update({
                where: {
                    id: selectedOption?.id
                },
                data: {
                    value: selectedOption!.value + 1
                }
            });
           record = await prisma.record.create({
                data: {
                    userId,
                    topicId,
                    choice
                }
            });
        });
        return NextResponse.json(record, {status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message:'Internal Server Error'
        },{status:500})
    }
}