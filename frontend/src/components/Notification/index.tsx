import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheck, FiStopCircle } from 'react-icons/fi';
import './styles.css';

interface NotificationProps {
	show?: boolean;
	error?: boolean;
	message: string;
	redirectTo?: string;
	timeToRedirect?: number;
}

const Notification: React.FC<NotificationProps> = (props) => {
	const [counter, setCounter] = useState(props.timeToRedirect || 5);

	const history = useHistory();

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter(counter => {
				if (counter - 1 <= 0) {
					clearInterval(interval);

					if (!props.error) {
						history.push(props.redirectTo || '/');
					}
				}

				return counter - 1;
			});
		}, 1000);

	}, []);

	return (
		<div className={props.show ? 'notification' : ''}>
			{
				props.show ?
					<div className="text">
						{
							props.error ?
								<FiStopCircle size={50} color="red" /> :
								<FiCheck size={50} color="#34CB79" />
						}
						<br />
						<h1> {props.message} </h1>
						{ !props.error && <h3> Você será redirecionado em {counter}... </h3>}
					</div> :
					<div></div>
			}
		</div>
	);
};

export default Notification;