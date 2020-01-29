
class RootController {
    static childControllers = [
        SortingController,
        PathFindingController
    ];

    static activeController;


    static onAlgorithmTypeChange() {
        RootController.activeController = RootController.childControllers[document.querySelector("#algorithmTypeSelector").value];
        RootController.activeController.init();
    }

    static init() {
        RootController.activeController = RootController.childControllers[0];
        RootController.activeController.init();
    }
}

RootController.init();