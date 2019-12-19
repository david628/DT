var map = new AMap.Map('id-test', {
    //features: ['bg', 'road'],
    mapStyle: 'amap://styles/blue',//blue dark darkblue grey
    showLabel: true,
    viewMode: '3D',
    expandZoomRange: true,
    zooms: [3, 20],
    rotation: 50,
    pitch: 60,
    zoom: 17,
    center: [116.390446, 39.992967]
});

//添加一个圆柱体
var addBox = function (center, length, width, height) {
    var box = new AMap.Object3D.MeshAcceptLights();
    var geometry = box.geometry;
    box.textures.push('https://a.amap.com/jsapi_demos/static/texture3d/shuilifang.png');

    var halfLength = length / 2;
    var halfWidth = width / 2;
    var path = [
        [-halfLength, halfWidth],
        [halfLength, halfWidth],
        [halfLength, -halfWidth],
        [-halfLength, -halfWidth]
    ];

    //构造4个侧面
    for (var i = 0; i < 4; i += 1) {
        var x1 = path[i][0];
        var y1 = path[i][1];

        var x2 = path[(i + 1) % 4][0];
        var y2 = path[(i + 1) % 4][1];

        // 每个侧面四个顶点
        geometry.vertices.push(x1, y1, 0);
        geometry.vertices.push(x1, y1, -height);
        geometry.vertices.push(x2, y2, 0);
        geometry.vertices.push(x2, y2, -height);

        var v1 = new AMap.Vector3(0, 0, -height);
        var v2 = new AMap.Vector3(x2 - x1, y2 - y1, 0);

        // 各面的法向量
        var normal = new AMap.Vector3().crossVectors(v2, v1).normalize().elements;

        geometry.vertexNormals.push(normal[0], normal[1], normal[2]);
        geometry.vertexNormals.push(normal[0], normal[1], normal[2]);
        geometry.vertexNormals.push(normal[0], normal[1], normal[2]);
        geometry.vertexNormals.push(normal[0], normal[1], normal[2]);

        // 四个顶点的纹理坐标
        geometry.vertexUVs.push(0, 1);
        geometry.vertexUVs.push(0, 0);
        geometry.vertexUVs.push(1, 1);
        geometry.vertexUVs.push(1, 0);

        var bottomIndex = i * 4;
        var topIndex = bottomIndex + 1;
        var nextBottomIndex = (bottomIndex + 2);
        var nextTopIndex = (bottomIndex + 3);

        // 侧面三角形1
        geometry.faces.push(topIndex, bottomIndex, nextBottomIndex);
        // 侧面三角形2
        geometry.faces.push(topIndex, nextBottomIndex, nextTopIndex);
    }
    //构造顶面
    for (var i = 0; i < 4; i += 1) {
        geometry.vertices.push(path[i][0], path[i][1], -height);
        geometry.vertexNormals.push(0, 0, -1);
    }

    // 四个顶点的纹理坐标
    geometry.vertexUVs.push(0, 2);
    geometry.vertexUVs.push(1, 2);
    geometry.vertexUVs.push(1, 0);
    geometry.vertexUVs.push(0, 0);

    // 侧面三角形1
    geometry.faces.push(16 + 0, 16 + 1, 16 + 2);
    // 侧面三角形2
    geometry.faces.push(16 + 0, 16 + 2, 16 + 3);

    box.position(center);

    // 如果使用了透明颜色，请设置true
    box.transparent = true;
    object3Dlayer.add(box);
};
map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
map.DirectionLight = new AMap.Lights.DirectionLight([-1, -1, 2], [1, 1, 1], 0.5);
var object3Dlayer = new AMap.Object3DLayer();
map.add(object3Dlayer);
var center = map.getCenter();
//addBox(center, 1600, 1600, 800);
