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
	const [notificationClass, setNotificationClass] = useState('hide');
	const [counter, setCounter] = useState(5);
	const history = useHistory();

	function handleRedirect() {
		const interval = setInterval(() => {
			setCounter(counter => {
				if (counter - 1 <= 0) {
					clearInterval(interval);

					if (props.error) {
						setNotificationClass('hide');
					} else {
						history.push(props.redirectTo || '/');
					}
				}

				return counter - 1;
			});
		}, 1000);
	}

	useEffect(() => {
		if (props.timeToRedirect) {
			setCounter(props.timeToRedirect);
		}
	}, [props.timeToRedirect]);

	useEffect(() => {
		if (props.show) {
			setNotificationClass('notification');
			handleRedirect();
		}
	}, [props.show]);

	return (
		<div className={notificationClass}>
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
						{!props.error && <h3> Você será redirecionado em {counter}... </h3>}
					</div> :
					<div></div>
			}
		</div>
	);
};

export default Notification;