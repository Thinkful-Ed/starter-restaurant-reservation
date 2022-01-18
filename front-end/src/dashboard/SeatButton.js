function SeatButton(reservation_id) {
    const linkText = `/reservations/${reservation_id}/seat`;
    return (
        <td>

            <a href={linkText} >
                <button className="btn btn-primary">
                    Seat
                </button>
            </a>
        </td>
        
    )
}
export default SeatButton;