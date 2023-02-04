import Swal from "sweetalert2";


export default function Validation(values) {

    const errMessage = Swal.fire({
        title: 'Oops!',
        text: 'Invalid username, email or password',
        icon: 'error',
        confirmButtonText: 'OK'
    })
}
