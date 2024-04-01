'use client'

import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import {SafeUser, safeListing } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";



interface PropertiesClientProps {
    listings: safeListing[];
    currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({listings, currentUser}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onDelete = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listing/${id}`)
        .then(() => {
            toast.success('Property deleted successfully');
            router.refresh()
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('')
        });
    }, [router])

  return (
    <Container>
        <Heading 
            title="Property"
            subtitle="List of your properties"
        />
        <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {listings.map((listing) => (
                <ListingCard 
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onDelete}
                    disabled={deletingId === listing.id}
                    actionLabel="Delete Property"
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default PropertiesClient