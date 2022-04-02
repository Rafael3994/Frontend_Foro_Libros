import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function LoadingPage() {

    const { session } = useSelector(state => state);

    return (
        <div>
            {
                session.isAdmin && (
                    <Navigate to="/admin/libros" />
                )
            }
            {
                !session.isAdmin && (
                    <Navigate to="/libros" />
                )
            }

        </div>
    )
}

export default LoadingPage;