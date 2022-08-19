import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import produits from "../../components/images/produits.jpg";
import ModalUpdateOrder from "./ModalUpdateOrder";
import Swal from "sweetalert2"; //pour le pop-up confirmation panier
import Select from "react-select"; 

function Order() {
	const [product, setProduct] = React.useState();
	// liste clients
	const [listProducts, setListProducts] = useState([]);
	const [update, setIsUpdate] = React.useState<boolean>(false);
	const [show, setShow] = React.useState(false);
	const [tot, setTot] = React.useState(0);

	const [tabCommand, setTabCommand] = useState<any>([]);

	function getProducts() {
		fetch(`http://localhost:5003/products/${localStorage.getItem("user_id")}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setListProducts(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	function totalOrder() {
		let Somme = 0;
		tabCommand.forEach((element: any) => {
			Somme += Number(element.Total);
		});

		setTot(Somme);
	}

	async function insertOrder() {
		var today = new Date();

		await fetch(`http://localhost:5003/addglobalorder`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: 17, /// id_client pas encore fait
				dateorder:
					today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear(),
				montanttotal: tot,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					for (const element of tabCommand) {
						detailOrder(element, result.order_id);
						// pour le pop-up on utilise swal.fire
						Swal.fire({
							title: "Merci pour votre commande",
							icon: "success",
							confirmButtonText: "Ok",
						});
						// window.location.reload();
					}
				},

				(error) => {
					console.log(error);
				}
			);
	}

	async function detailOrder(element: any, id: any) {
		await fetch(`http://localhost:5003/addproductorder`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: 17,
				order_id: id,
				nom: element.Nom,
				prixunitaire: element.Prix,
				image: element.Image,
				quantite: element.Quantité,
				prixtotal: element.Total,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					console.log(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	useEffect(() => {
		getProducts();
		setIsUpdate(false);
	}, [update]);

	return (
		<div className="container my-5">
			<div className="row my-5">
				<div className="col-8 mr-3 mt-2">
					{" "}
					{/* 2/3 de l'écran col-8*/}
					<div className="row">
						{listProducts.map((product: any) => {
							return (
								<div className="col-sm mt-3">
									<Card style={{ width: "19rem" }}>
										<Card.Img variant="top" src={produits} />
										<Card.Body>
											<Card.Title>Nom : {product.nom}</Card.Title>
											<Card.Title>Prix : {product.prix}</Card.Title>
											<Card.Title>Image : {product.image}</Card.Title>
											<div className="d-flex justify-content-center">
												<div className="p-2 bd-highlight">
													<Button
														variant="success"
														onClick={() => {
															setProduct(product);
															setShow(true);
														}}
													>
														Ajouter
													</Button>
												</div>
											</div>
										</Card.Body>
									</Card>
								</div>
							);
						})}
						<ModalUpdateOrder
							show={show}
							setShow={setShow}
							product={product}
							tabCommand={tabCommand}
							setTabCommand={setTabCommand}
							setTot={setTot}
						/>
					</div>
				</div>
				<div className="col-4">
					{" "}
					{/* le 1/3 qui restait col-4 */}
					<h1 style={{ textAlign: "center" }}> Votre Panier </h1>
					<table className="table mt-5 text-center">
						<thead>
							<tr>
								<th>Nom</th>
								<th>Prix</th>
								<th>Image</th>
								<th>Quantité</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{tabCommand.map((data: any, index: number) => {
								return (
									<tr>
										<td>{data.Nom}</td>
										<td>{data.Prix}€</td>
										<td>{data.Image}</td>
										<td>{data.Quantité}</td>
										<td>{data.Total}€</td>
										<td>
											<Button
												variant="danger"
												onClick={() => {
													tabCommand.splice(index, 1);
													totalOrder();
													setIsUpdate(true);
												}}
											>
												supprimer
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="d-flex justify-content-between">
						<div className="fas fa-divide ">
							<h5>Total du panier = {tot} €</h5>
						</div>
						<div className="p-2 bd-highlight">
							<Button
								variant="success"
								onClick={() => {
									insertOrder();

									// window.location.reload();
								}}
							>
								commander
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Order;
