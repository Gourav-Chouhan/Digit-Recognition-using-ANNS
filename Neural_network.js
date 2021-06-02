class Network {
    constructor(sizes) {
        this.layers = sizes.length;
        this.sizes = sizes;
        this.weights = [];
        this.biases = [];
        for (let i = 1; i < this.layers; i++) {
            let weight = new Matrix(sizes[i], sizes[i - 1]);
            weight.fill_random(-1, 1);
            this.weights.push(weight);
            let bias = new Matrix(sizes[i], 1);
            bias.fill_random(-1, 1);
            this.biases.push(bias);
        }
    }

    feed_forward(input) {
        let output = input;
        for (let i = 0; i < this.layers - 1; i++) {
            output = ((this.weights[i].dot(output)).add(this.biases[i])).sigmoid();
        }
        return output;
    }

    update_weights(list) {
        for (let i = 0; i < list.length; i++) {
            this.weights[i] = Matrix.two_d_list_to_matrix(list[i]);
        }
    }

    update_biases(list) {
        for (let i = 0; i < list.length; i++) {
            this.biases[i] = Matrix.two_d_list_to_matrix(list[i]);
        }
    }

}