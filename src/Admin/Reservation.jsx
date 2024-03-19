import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Partials/HeaderAdmin";
import MenuAdmin from "../Partials/MenuAdmin";
import TitleAdmin from "../Partials/TitleAdmin";
import axios from "axios";
import config from "../config";
import { BiShow, BiTime, BiX } from "react-icons/bi";
import moment from "moment";
import Button from "../components/Button";
import Popup from "../components/Popup";
import Separator from "../components/Separator";

const Reservation = () => {
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [raw, setRaw] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/reservation?page=${page}`)
            .then(response => {
                let res = response.data;
                setRaw(res.reservations);
                setReservations(res.reservations.data);
            })
        }
    }, [isLoading]);

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'reservation'} />
            <div className="content user">
                <TitleAdmin
                    title="Reservasi"
                    description="Yang ditanyakan pengguna mengenai listing favorit mereka"
                />

                <table>
                    <thead>
                        <tr>
                            <th>Listing</th>
                            <th>User</th>
                            <th><BiTime /></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservations.map((rsv, r) => (
                                <tr key={r}>
                                    <td>{rsv.listing?.name}</td>
                                    <td>{rsv.user?.name}</td>
                                    <td>{moment(rsv.created_at).format('DD MMM, HH:mm')}</td>
                                    <td>
                                        <Button accent="secondary" height={32} onClick={() => setReservation(rsv)}>
                                            <BiShow />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                reservation !== null &&
                <Popup onDismiss={() => setReservation(null)}>
                    <TitleAdmin
                        title={`Reservasi #${reservation.id}`}
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setReservation(null)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div className="inline">
                        <TitleAdmin
                            left={
                                <img src={reservation.user.photo} style={{
                                    height: 72,width: 64,objectFit: 'cover',borderRadius: 8,
                                }} />
                            }
                            title={reservation.user.name}
                            description={reservation.user.email}
                        />
                        <TitleAdmin
                            left={
                                <img src={`${config.baseUrl}/storage/listing_photos/${reservation.listing.front_building_photo}`} style={{
                                    height: 72,objectFit: 'cover',aspectRatio: 16/9,borderRadius: 8,
                                }} />
                            }
                            title={reservation.listing.name}
                            description={`${reservation.listing.subdistrict}, ${reservation.listing.city}`}
                        />
                    </div>

                    <Separator />

                    {
                        reservation.forms.map((form, f) => (
                            <div key={f} className="inline" style={{marginBottom: 10,gap: 10}}>
                                <div style={{fontWeight: '600'}}>{form.template.type} :</div>
                                <div>{form.template.body}</div>
                            </div>
                        ))
                    }
                </Popup>
            }
        </>
    )
}

export default Reservation