'use client'

import Image from "next/image";

import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser, safeListing } from "@/app/types";
import useCountries from "@/app/hoooks/useCountries";

import HeartButton from "../HeartButton";
import Button from "../Button";


interface ListingCardProps {
    data: safeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    
}

const ListingCard: React.FC<ListingCardProps> = ({data, reservation, onAction, disabled, actionLabel, actionId="", currentUser}) => {
    const router = useRouter()
    const {getByValue} = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId)
        
    },[actionId, disabled, onAction]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if(!reservation) {
            return null;
        }

        const start = new Date (reservation.startDate);
        const end = new Date (reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation]);
    
  return (
    <div
        onClick={() => router.push(`listing/${data.id}`)} 
        className="col-span-1 group cursor-pointer"
    >
        <div className="flex flex-col gap-2 w-full">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image 
                    fill
                    alt="Listing"
                    src={data.imageSrc}
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                />
                <div className="absolute top-3 right-3">
                <HeartButton 
                    listingId={data.id}
                    currentUser={currentUser}
                />
                </div>
            </div>
            <div className="font-semibold text-lg"> {/* do not forget to add a flag here */}
                {location?.region}, {location?.label} 
            </div>
            <div className="">
                {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                    ${price}
                </div>
                {!reservation && (
                    <div className="font-light"> per night</div>
                )}
            </div>
            {onAction && actionLabel && (
                <Button 
                    disabled={disabled}
                    small
                    label={actionLabel}
                    onClick = {handleCancel}
                />
            )}
        </div>
    </div>
  )
}

export default ListingCard