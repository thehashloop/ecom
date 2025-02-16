"use client";
import React, { useMemo } from "react";

type FloatButtonShape = "circle" | "square";
type FloatButtonType = "default" | "primary";

interface FloatButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
	className?: string;
	style?: React.CSSProperties;
	icon?: React.ReactNode;
	description?: React.ReactNode;
	type?: FloatButtonType;
	shape?: FloatButtonShape;
	href?: string;
	target?: string;
	tooltip?: React.ReactNode;
	badge?: {
		dot?: boolean;
		count?: number;
		color?: string;
	};
	direction?: "ltr" | "rtl";
}

const FloatButtonIndependent: React.FC<FloatButtonProps> = ({
	className,
	style,
	icon,
	description,
	type = "default",
	shape = "circle",
	href,
	target,
	tooltip,
	badge,
	direction = "ltr",
	...restProps
}) => {
	const [isHovered, setIsHovered] = React.useState(false);
	const [isActive, setIsActive] = React.useState(false);

	// Add warning in development
	React.useEffect(() => {
		if (process.env.NODE_ENV !== "production") {
			if (shape === "circle" && description) {
				console.warn(
					"FloatButton: description is only supported when shape is square. Due to narrow space for text, short sentence is recommended.",
				);
			}
		}
	}, [shape, description]);

	// Base styles
	const baseStyles: React.CSSProperties = {
		position: "fixed",
		[direction === "rtl" ? "left" : "right"]: "24px",
		bottom: "24px",
		width: "40px",
		height: "40px",
		padding: 0,
		border: "none",
		borderRadius: shape === "circle" ? "50%" : "6px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
		transition: "all 0.3s",
		zIndex: 100,
		outline: "none",
		...style,
	};

	// Type styles
	const typeStyles: React.CSSProperties =
		type === "primary"
			? {
					backgroundColor:
						style?.backgroundColor || (isHovered ? "#4096ff" : isActive ? "#0958d9" : "#1677ff"),
					color: "#fff",
					transition: "background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
					filter: isHovered ? "brightness(95%)" : isActive ? "brightness(90%)" : "none",
				}
			: {
					backgroundColor: isHovered ? "#f0f0f0" : isActive ? "#e6e6e6" : "#fff",
					color: "rgba(0, 0, 0, 0.85)",
					transition: "background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
				};

	// Badge styles
	const badgeStyles: React.CSSProperties = {
		position: "absolute",
		top: "-6px",
		right: "-6px",
		minWidth: "20px",
		height: "20px",
		padding: "0 6px",
		fontSize: "12px",
		lineHeight: "20px",
		textAlign: "center",
		backgroundColor: "#ff4d4f",
		color: "#fff",
		borderRadius: "10px",
		boxShadow: "0 0 0 1px #fff",
	};

	const mergedStyles = {
		...baseStyles,
		...typeStyles,
	};

	// Content rendering
	const contentNode = useMemo(
		() => (
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				{icon && (
					<div
						style={{
							textAlign: "center",
							margin: "auto",
							width: "24px",
							height: "24px",
							fontSize: "24px",
							lineHeight: 1,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{icon}
					</div>
				)}
				{description && shape === "square" && (
					<div
						style={{
							fontSize: "12px",
							marginTop: "4px",
							display: "flex",
							alignItems: "center",
							lineHeight: "20px",
							color: type === "primary" ? "#fff" : "rgba(0, 0, 0, 0.85)",
						}}
					>
						{description}
					</div>
				)}
			</div>
		),
		[icon, description, shape, type],
	);

	// Badge rendering
	const renderBadge = (children: React.ReactNode) => {
		if (!badge) return children;

		return (
			<div style={{ position: "relative" }}>
				{children}
				{badge.dot ? (
					<div
						style={{
							...badgeStyles,
							width: "8px",
							height: "8px",
							minWidth: "auto",
							padding: 0,
							borderRadius: "50%",
							backgroundColor: badge.color || "#ff4d4f",
						}}
					/>
				) : badge.count ? (
					<div style={badgeStyles}>{badge.count}</div>
				) : null}
			</div>
		);
	};

	// Tooltip wrapper
	const renderWithTooltip = (children: React.ReactNode) => {
		if (!tooltip) return children;

		return (
			<div
				style={{
					position: "relative",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					height: "100%",
				}}
				title={tooltip as string}
			>
				{children}
			</div>
		);
	};

	const buttonNode = renderWithTooltip(renderBadge(contentNode));

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	return href ? (
		<a
			href={href}
			target={target}
			className={className}
			style={mergedStyles}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...(restProps as React.HTMLAttributes<HTMLAnchorElement>)}
		>
			{buttonNode}
		</a>
	) : (
		<button
			className={className}
			style={mergedStyles}
			type="button"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={() => {
				handleMouseLeave();
				setIsActive(false);
			}}
			onMouseDown={() => setIsActive(true)}
			onMouseUp={() => setIsActive(false)}
			{...(restProps as React.HTMLAttributes<HTMLButtonElement>)}
		>
			{buttonNode}
		</button>
	);
};

export { FloatButtonIndependent };
