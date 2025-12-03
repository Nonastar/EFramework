import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("PointInfo")
class PointInfo {

    @property
    size: Vec2 = new Vec2();
    @property
    point1: Vec2 = new Vec2();
    @property
    point2: Vec2 = new Vec2();
}


@ccclass('DiffrientPoints')
export class DiffrientPoints extends Component {

    @property
    points: PointInfo[] = [];

    start() {

    }

    update(deltaTime: number) {
        
    }
}


