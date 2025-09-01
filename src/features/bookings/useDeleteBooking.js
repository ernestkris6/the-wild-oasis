import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteCabinApi } from "../../services/apiBooking";

export function useDeleteBooking(){

    const queryClient = useQueryClient();
    
    const {isLoading: isDeleting, mutate: deleteBooking} = useMutation({
        // mutationFn: (id) => deleteBooking(id),
        mutationFn: deleteCabinApi,
        onSuccess: () => {
          toast.success('Cabin deleted successfully')
    
          queryClient.invalidateQueries({
            queryKey: ['bookings']
          })
        },
        onError: (err) => alert(err.message)
      })

      return {isDeleting, deleteBooking}
}


