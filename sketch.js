let nn;
let input;
let board = [];
let box;
let btn;
let cvs;
let p;
let div;


function setup() {
    cvs = createCanvas(28 * 15, 28 * 15);
    p = document.createElement('p')
    p.id = "status";
    p.innerHTML = "Draw Something!"
    btn = document.createElement('button')
    btn.id = "predict"
    btn.onclick = predict
    btn.innerHTML = "Predict"
    div = document.createElement('div')
    div.id = "div"
    div.appendChild(p)
    div.appendChild(btn)
    document.body.appendChild(div)
    frameRate(120934)
    background(51);
    box = width / 28;
    clearBoard();
    nn = new Network([784, 30, 10]);
    for(let i = 0;i<nn.weights.length;i++){
        nn.weights[i] = Matrix.two_d_list_to_matrix(obj['weights'][i])
        //console.log('hi')
    }

    for(let i = 0;i<nn.biases.length;i++){
        nn.biases[i] = Matrix.two_d_list_to_matrix(obj['biases'][i])
        //console.log('hi')
    }
    // nn.weights = obj.weights;
    // nn.biasis = obj.biasis;
    // //console.log(nn.weights);
}


function draw() {
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
            fill(255 - board[i][j]);
            // stroke(random(40, 244));
            noStroke();
            rect(box * j, box * i, box, box);
        }
    }
    // noLoop();
}

function mouseDragged() {
    let x = map(mouseX, 0, width, 0, 28);
    let y = map(mouseY, 0, height, 0, 28);
    x = floor(x);
    y = floor(y);
    if(!(x < 0 || x > 28 || y < 0 || y > 28)) {
    board[y][x] = 244;
    board[y+1][x+1] = 244;
    board[y+1][x] = 244;
    board[y][x+1] = 244;
    // board[y][x + 1] = random(160,255);
        }    // board[y + 1][x + 1] = 223;
    // board[y - 1][x] = 222;
    // board[y + 1][x + 1] = 225;
    // //console.log(x, nn.feed_forward(input).matrix[0][0]);
}

function clearBoard() {
    for (let i = 0; i < 28; i++) {
        board[i] = [];
        for (let j = 0; j < 28; j++) {
            board[i][j] = 0;
        }
    }
}

function reshape(list) {
    let g = [];

    let count = 0;
    list = list.split(",");

    for (let i = 0; i < 28; i++) {
        g[i] = [];
        for (let j = 0; j < 28; j++) {
            g[i][j] = 255 - parseInt(list[count++]);
        }
    }

    return g;
}

function predict() {
    let inputs = new Matrix(784, 1);
    let count = 0;
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
            inputs.matrix[count++][0] = (board[i][j] + 0.001) / 255 - 0.002;
        }
    }
    let outputs = nn.feed_forward(inputs);
    let maxi;
    let m = -10;
    for (let i = 0; i < 10; i++) {
        if (outputs.matrix[i][0] > m) {
            maxi = i;
            m = outputs.matrix[i][0];
        }
    }
    document.getElementById("status").innerHTML = "I think its " + (maxi);
    //console.log(outputs);
    clearBoard();
}