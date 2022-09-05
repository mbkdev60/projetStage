import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";
import ModalDetailOrder from "./ModalDetailOrder";
// import Swal from "sweetalert2";

function History() {
	const [listClients, setListClients] = useState([]);
	const [selectedOption, setSelectedOption] = React.useState(0);
	const [listOrder, setlistOrder] = React.useState<any>();
	const [detailCmd, setDetailCmd] = useState<any>();
	const [show, setShow] = React.useState(false);
	const [cmd, setCmd] = useState(0);
	// const [listCommand, setlistCommand] = React.useState<any>();

	async function getClients() {
		await fetch(
			`http://localhost:5003/clients/${localStorage.getItem("user_id")}`,
			{
				method: "GET",
			}
		)
			.then((res) => res.json())
			.then(
				(result) => {
					setListClients(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	async function getOrders() {
		await fetch(`http://localhost:5003/getglobalOrder`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setlistOrder(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	async function getListCommand(user_id: any) {
		await fetch(`http://localhost:5003/getlistcommand/${user_id}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setlistOrder(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	async function getProductOrder(order_id: any) {
		await fetch(`http://localhost:5003/getproductorder/${order_id}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setDetailCmd(result);
					console.log(
						"🚀 ~ file: History.tsx ~ line 74 ~ getProductOrder ~ setDetailCmd",
						detailCmd
					);
				},

				(error) => {
					console.log(error);
				}
			);
	}
	const results: any = [];
	results.push({ value: "00", label: "Tous..." });
	listClients.forEach((element: any, index: any) => {
		results.push({ value: element.client_id, label: element.nom });
	});

	useEffect(() => {
		getClients();
		getOrders();
	}, []);

	// console.log(listOrder);
	// console.log(listCommand);
	return (
		<div className="container my-5">
			<div style={{ width: "19rem" }}>
				<Select
					defaultValue={selectedOption}
					onChange={(e: any) => {
						console.log("selected option", e.value);
						setSelectedOption(e.value);
						e.value === "00" ? getOrders() : getListCommand(e.value);
					}}
					options={results}
				/>
			</div>
			<div>
				<table className="table mt-5 text-center">
					<thead>
						<tr>
							<th>N° de Commande</th>
							<th>Réf Client</th>
							<th>Date</th>
							<th>Montant Total</th>
						</tr>
					</thead>
					<tbody>
						{listOrder
							// ?.filter(
							// 	(element: any) => element.user_id === user_id
							// )
							?.map((data: any, index: number) => {
								return (
									<tr>
										<td>{data.order_id}</td>
										<td>{data.user_id}</td>
										<td>{data.dateorder}</td>
										<td>{data.montanttotal} €</td>
										<td>
											<Button
												className=" btn btn-info btn-rounded"
												onClick={() => {
													getProductOrder(data.order_id);
													setShow(true);
													setCmd(data.order_id);
												}}
											>
												Détails
											</Button>
										</td>
									</tr>
								);
							})}
						<ModalDetailOrder
							show={show}
							setShow={setShow}
							detailCmd={detailCmd}
							setDetailCmd={setDetailCmd}
							cmd={cmd}
						/>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default History;