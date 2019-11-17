import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	forwardRef,
	Inject,
	Type,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { FabricDialogService } from './fabric-dialog.service';

@Component({
	templateUrl: './fabric-dialog.component.html'
})
export class FabricDialogComponent implements AfterViewInit {

	@ViewChild('container', { read: ViewContainerRef })
	container: ViewContainerRef;

	dialogNestedComponent: Type<any>;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
				private changeDetectorRef: ChangeDetectorRef,
				@Inject(forwardRef(() => FabricDialogService)) private dialogService: FabricDialogService) {
	}

	ngAfterViewInit() {
		this.createNestedComponent(this.dialogNestedComponent);
		this.changeDetectorRef.detectChanges();
	}

	closeDialog() {
		this.dialogService.close();
	}

	private createNestedComponent(component: Type<any>): void {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

		this.container.createComponent(componentFactory);
	}
}
