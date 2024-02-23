// eslint-disable-next-line react/prop-types
const Dialog = ({ score }) => {

    return (
        <dialog id="submitted" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Congratulations !! you did it 🤩 🔥 </h3>
                <p className="p-6 text-md font-sans">you score is:<span className="text-2xl font-bold"> {score} </span></p>
                <div className="modal-action">
                    <form method="dialog">

                        <button className="btn btn-active btn-primary" onClick={() =>{}}>Got it, thanks</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Dialog;