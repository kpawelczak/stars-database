import { Component } from '@angular/core';

@Component({
	selector: 'stars-header',
	template: `
		<div class="stars-header">
			<h3>Stars Database</h3>
			<a id="link" href="https://github.com/kpawelczak/stars-database">Github</a>
		</div>
	`,
	styleUrls:['./stars-header.scss']
})
export class StarsHeaderComponent {
}
