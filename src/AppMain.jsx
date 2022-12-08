import './AppMain.scss';

if (DEBUG) require("preact/debug");
import { render, options } from 'preact';
import clsx from "clsx";
import { Main } from './Main';


// clsx binding to preact
options.vnode = (vnode) => {
	('object' == typeof vnode.props.class) && (vnode.props.class = clsx(vnode.props.class));
};

// Mount main component
render(<Main />, document.getElementById('appMain'));
