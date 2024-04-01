import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="unauthorized"
                    subtitle="Plese login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({userId: currentUser.id});

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you haven't reserved any trips."
                />
            </ClientOnly>
        )
    }
    // this code is going to be functional of the user actually has a reservation
    return (
        <ClientOnly>
            <TripsClient 
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage;