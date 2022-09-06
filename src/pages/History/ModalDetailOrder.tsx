import { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactToPrint from "react-to-print";

type Modaltype = {
	show: boolean;
	setShow: Function;
	detailCmd: any;
	setDetailCmd: Function;
	cmd: any;
	nomClt : any,
};

function ModalDetailOrder({
	show,
	setShow,
	detailCmd,
	setDetailCmd,
	cmd,
	nomClt,
}: Modaltype) {
	const handleClose = () => setShow(false);
	const componentRef = useRef<HTMLDivElement>(null);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header>
				<Modal.Title>
					<h4>Détail de la commande N° : {cmd}</h4>
					<h4>Au nom de : {nomClt}</h4>
				</Modal.Title>
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

				<ReactToPrint
					trigger={() => <Button> Imprimer </Button>}
					content={() => componentRef.current}
				/>
				<div style={{ display: "none" }}>
					<div ref={componentRef}>
						<div>
							<Modal.Header>
								<Modal.Title>
									<h5	>Détail de la commande N° : {cmd}</h5>
									<h5>Au nom de : {nomClt}</h5>
								</Modal.Title>
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
						</div>
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalDetailOrder;
