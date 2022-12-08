import S from './Main.module.scss';

import { useState } from 'preact/hooks';


export function Main()
{
	const [ buttonState1, setButtonState1 ] = useState(false);
	const [ buttonState2, setButtonState2 ] = useState(false);

	return (
		<div class={S.main}>
			<header>Hello world</header>
			<button onClick={() => setButtonState1(v => !v)} class={[S.button, S.button1]}>Click me !</button>
			<button onClick={() => setButtonState2(v => !v)} class={[S.button, S.button2]}>And me !</button>
			<p class={[ S.result, buttonState1 && S.style1, buttonState2 && S.style2 ]}>Result 1</p>
			<p class={[ S.result, { [S.style1]: buttonState2, [S.style2]: buttonState1}]}>Result 2</p>
		</div>
	);
}
