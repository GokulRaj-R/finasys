import Swal from "sweetalert2";
const getAlert = () => {
        const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
    return Toast;
}


export const triggerAlert = data => {
    const toast = getAlert();
    toast.fire(data);
};