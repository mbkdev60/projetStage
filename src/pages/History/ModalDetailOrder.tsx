import React from "react";
import { Button, Modal } from "react-bootstrap";

type Modaltype = {
	show: boolean;
	setShow: Function;
	detailCmd: any;
	setDetailCmd: Function;
	cmd: any;
};

function ModalDetailOrder({
	show,
	setShow,
	detailCmd,
	setDetailCmd,
	cmd,
}: Modaltype) {
	const handleClose = () => setShow(false);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header>
				<Modal.Title>Détail de la commande N° {cmd}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex justify-content-center">
					<table className="table mt-5 text-center">
						<thead>
							<tr>
								<th>Nom</th>
								<th>Prix Unitaire</th>
								<th>Image</th>
								<th>Quantité</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{/* ? => si detailCmd est vide ne la prend pas*/}
							{detailCmd?.map((data: any, index: number) => {
								return (
									<tr>
										<td>{data.nom}</td>
										<td>{data.prixunitaire} €</td>
										<td>{data.image}</td>
										<td>{data.quantite}</td>
										<td>{data.prixtotal} €</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="info" onClick={handleClose}>
					Fermer
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalDetailOrder;
