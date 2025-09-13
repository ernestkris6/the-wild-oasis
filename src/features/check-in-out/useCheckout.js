// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateBooking } from "../../services/apiBooking";
// import { toast } from "react-hot-toast";

// export function useCheckout() {
//   const queryClient = useQueryClient();

//   const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
//     mutationFn: (bookingId) =>
//       updateBooking(bookingId, {
//         status: "checked-out",
//       }),

//     onSuccess: (data) => {
//       toast.success(`Booking #${data.id} successfully checked out`);
//       queryClient.invalidateQueries({ active: true });
//     },

//     onError: () => toast.error("There was an error while checking out"),
//   });

//   return { checkout, isCheckingOut };
// }


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBooking";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}

























// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateBooking } from "../../services/apiBooking";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export function useCheckin(){

//     const queryClient = useQueryClient();   
//     const navigate = useNavigate()

//     const {mutate: checkin, isLoading: isCheckingIn} = useMutation({
//         mutationFn: (bookingId) => updateBooking(bookingId, {
//             status: 'checked-in',
//             isPaid: true,
//         }),
//         onSuccess: (data) => {
//             toast.success(`Booking #${data.id} successfully checked in`);
//             queryClient.invalidateQueries({active: true}) ;
//             navigate("/") 
//         },
//         onError: () => toast.error("There was an error while checking in"),
//     });

//     return {checkin, isCheckingIn}
// }