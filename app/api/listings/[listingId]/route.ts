import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser"; //from actions
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

//lets create our routes for deleting our listing(in the myproperties page, delete property btn)
export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}
