import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import './styles.css';

interface NotificationProps {
	show?: boolean;
	message: string;
	redirectTo?: string;
	timeToRedirect?: number;
}

const Notification: React.FC<NotificationProps> = (props) => {
	const [counter, setCounter] = useState(props.timeToRedirect || 10);

	const history = useHistory();

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter(counter => {
				if (counter - 1 <= 0) {
					history.push(props.redirectTo || '/');
					clearInterval(interval);
				}

				return counter - 1;
			});
		}, 1000);

	}, []);

	return (
		<div className={props.show ? 'fundo items' : ''}>
			{
				props.show ?
					<div className="text">
						<FiCheck size={50} color="#34CB79" />
						<br />
						<h1> {props.message} </h1>
						<h3> Você será redirecionado em {counter}... </h3>
					</div> :
					<div></div>
			}
		</div>
	);
};

export default Notification;