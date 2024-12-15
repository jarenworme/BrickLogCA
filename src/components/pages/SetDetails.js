import { useNavigate, useParams } from "react-router-dom";
import { useFetchSet } from "../../hooks/useFetchSet";
// import { useEditSet } from "../../hooks/useEditSet";


export default function SetDetails () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    
    const routeHome = () => navigate('/', { replace: false });


    // const { editSet } = useEditSet();

    // const handleEdit = () => {
    //     editSet("U3uY0ENyk3lE0A0ONUJz", {
    //         setName: "Updated set",
    //         pieceCount: 120,
    //     });
    // };

    const { setID } = useParams();

    const { set, loading, error } = useFetchSet(setID);

    if (loading) return <p>Loading set details...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!set) return <p>No set found.</p>;

    return (
        <div className="outer-container">
            <button onClick={routeHome}>Back</button>
            <h2>{set.name}</h2>
            <p>Set Number: {set.set_num}</p>
            <p>Year: {set.year}</p>
            <p>Number of Parts: {set.num_parts}</p>
            <p>Theme ID: {set.theme_id}</p>
            <img src={set.img_url} alt={set.name} />
        </div>
    );
}
