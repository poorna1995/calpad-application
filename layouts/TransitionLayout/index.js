import React from "react";
import { useState, memo, useEffect } from "react";
import styles from "styles/Layout.module.css";

const TransitionLayout = ({ children }) => {
	const [displayChildren, setDisplayChildren] = useState(children);
	const [transitionStage, setTransitionStage] = useState("fadeOut");
	useEffect(() => {
		setTransitionStage("fadeIn");
	}, []);

	useEffect(() => {
		if (children !== displayChildren) setTransitionStage("fadeOut");
	}, [children, setDisplayChildren, displayChildren]);

	return (
		<div>
			<div
				onTransitionEnd={() => {
					if (transitionStage === "fadeOut") {
						console.log("fading out");
						setDisplayChildren(children);
						setTransitionStage("fadeIn");
					}
				}}
				className={`${styles.content} ${styles[transitionStage]}`}
			>
				{displayChildren}
			</div>
		</div>
	);
};

export default TransitionLayout;
