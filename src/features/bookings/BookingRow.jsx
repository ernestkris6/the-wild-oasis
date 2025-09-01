import styled from "styled-components";
import { format, isToday } from "date-fns";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };


const navigate = useNavigate();
const {checkout, isCheckinOut} = useCheckout();
const {deleteBooking, isDeleting} = useDeleteBooking()

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

    <Modal>

        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          
          <Menus.List id={bookingId}>
              <Menus.Button icon={<HiEye />} onClick={()=> navigate(`/bookings/${bookingId}`)}>
                See details
              </Menus.Button>
              {status === 'unconfirmed' && <Menus.Button icon={<HiArrowDownOnSquare />} onClick={()=> navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>}

              {status === 'checked-in' && <Menus.Button icon={<HiArrowUpOnSquare />}  
                onClick={()=> checkout(bookingId)} 
                disabled={isCheckinOut}
                >
                Check out
              </Menus.Button>}

              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>
                  Delete booking
                </Menus.Button>
              </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='delete'>
              <ConfirmDelete resourceName='booking' disabled={isDeleting} onConfirm={() => deleteBooking(bookingId)}/>
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;









// import { useSearchParams } from "react-router-dom";
// import styled, { css } from "styled-components";

// const StyledFilter = styled.div`
//   border: 1px solid var(--color-grey-100);
//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-sm);
//   border-radius: var(--border-radius-sm);
//   padding: 0.4rem;
//   display: flex;
//   gap: 0.4rem;
// `;

// const FilterButton = styled.button`
//   background-color: var(--color-grey-0);
//   border: none;

//   ${(props) =>
//     props.active &&
//     css`
//       background-color: var(--color-brand-600);
//       color: var(--color-brand-50);
//     `}

//   border-radius: var(--border-radius-sm);
//   font-weight: 500;
//   font-size: 1.4rem;
//   /* To give the same height as select */
//   padding: 0.44rem 0.8rem;
//   transition: all 0.3s;

//   &:hover:not(:disabled) {
//     background-color: var(--color-brand-600);
//     color: var(--color-brand-50);
//   }
// `;


// export default function Filter({filterField, options}) {

//   const [searchParams, setSearchParams] = useSearchParams()

//   const currentFilter = searchParams.get(filterField) || options.at(0).value;

//   function handleClick(value){
//       searchParams.set("discount", value)
//       setSearchParams(searchParams);

//   }

//   return (
//     <StyledFilter>
//       {options.map((option) => 
//       <FilterButton
//         key={option.value}
//         onClick={() => handleClick(option.value)}
//         active={option.value === currentFilter}
//         disabled={option.value === currentFilter}
//        >
//         {option.label}
//        </FilterButton>
//        )}

//       {/* <FilterButton onClick={()=> handleClick('all')}>All</FilterButton>
//       <FilterButton onClick={()=> handleClick('no-discount')}>No discount</FilterButton>
//       <FilterButton onClick={()=> handleClick('with-discount')}>With discount</FilterButton> */}
//     </StyledFilter>
//   )
// }
