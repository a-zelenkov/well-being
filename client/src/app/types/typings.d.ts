// eslint-disable-next-line no-underscore-dangle
declare const __IS_DEV__: boolean;

declare module "*.m.css" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.m.scss" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.m.sass" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.m.less" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.m.styl" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}
declare module "*.svg?url" {
	const content: string;
	export default content;
}
declare module "*.png" {
	const content: string;
	export default content;
}
declare module "*.jpg";
