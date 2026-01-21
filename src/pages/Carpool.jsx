import React, { useState, useEffect } from 'react';
import { CarpoolService } from '../services/storage';
import { Button } from '../components/UI';
import { Car, MapPin, Calendar, Clock, UserPlus } from 'lucide-react';

export default function Carpool() {
    const [rides, setRides] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newRide, setNewRide] = useState({ from: '', to: '', date: '', price: '' });

    useEffect(() => {
        setRides(CarpoolService.getRides());
    }, []);

    const handleBook = (id) => {
        if (CarpoolService.bookSeat(id)) {
            alert("Seat Booked Successfully! 🚗");
            setRides(CarpoolService.getRides());
        } else {
            alert("No seats left!");
        }
    };

    const handlePublish = (e) => {
        e.preventDefault();
        CarpoolService.addRide({ ...newRide, driver: "Me", time: "10:00" });
        setRides(CarpoolService.getRides());
        setShowForm(false);
        alert("Ride Published!");
    };

    return (
        <div className="pb-24 pt-8">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                        <Car className="text-red-500" size={32} />
                        Koora Ride
                    </h1>
                    <p className="text-gray-400">Share the journey, split the cost. Fan to Fan.</p>
                </div>
                <Button variant="primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Offer a Ride'}
                </Button>
            </header>

            {showForm && (
                <div className="card mb-8 animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold mb-4">Publish a New Ride</h3>
                    <form onSubmit={handlePublish} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input className="input-field m-0" placeholder="From (e.g. Casa)" required onChange={e => setNewRide({ ...newRide, from: e.target.value })} />
                        <input className="input-field m-0" placeholder="To (e.g. Tangier)" required onChange={e => setNewRide({ ...newRide, to: e.target.value })} />
                        <input className="input-field m-0" type="date" required onChange={e => setNewRide({ ...newRide, date: e.target.value })} />
                        <input className="input-field m-0" placeholder="Price (DH)" required onChange={e => setNewRide({ ...newRide, price: e.target.value })} />
                        <div className="col-span-full">
                            <Button variant="primary" className="w-full">Publish Now</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {rides.map(ride => (
                    <div key={ride.id} className="card flex flex-col md:flex-row items-center justify-between hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl">🚗</div>
                            <div>
                                <div className="flex items-center gap-2 text-xl font-bold mb-1">
                                    {ride.from} <span className="text-gray-500">➜</span> {ride.to}
                                </div>
                                <div className="flex gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1"><UserPlus size={14} /> Driver: {ride.driver}</span>
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {ride.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {ride.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right">
                                <div className="text-2xl font-black text-red-500">{ride.price}</div>
                                <div className="text-xs text-gray-400">{ride.seats} seats left</div>
                            </div>
                            <Button
                                variant={ride.seats > 0 ? "primary" : "secondary"}
                                disabled={ride.seats === 0}
                                onClick={() => handleBook(ride.id)}
                            >
                                {ride.seats > 0 ? 'Book' : 'Full'}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
