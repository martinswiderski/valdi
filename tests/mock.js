

function MockVal() {


    var i = 0;

    this._value = null;
    this.return = true; // in mock only
    this.parent = '';
    this.id     = 1;

    this.new = function(newdescr) {
        var mock = new MockVal();
        mock.desc = newdescr;
        mock.id = ++i;
        mock.parent = this.id;
        return mock;
    };

    this.value = function(input, fail) {
        this._value = input;
        return (fail === true) ? !this.return : this.return;
    };

    this.number = function() {
        return this;
    };

    this.integer = function() {
        return this;
    };

    this.integerAsString = function() {
        return this;
    };

    this.real = function() {
        return this;
    };

    this.realAsString = function() {
        return this;
    };

    this.bool = function() {
        return this;
    };

    this.base64 = function() {
        return this;
    };

    this.null = function() {
        return this;
    };

    this.validLocale = function() {
        return this;
    };

    this.string = function() {
        return this;
    };

    this.alphanumeric = function(locale) {
        return this;
    };

    this.regexMatch = function(pattern) {
        return this;
    };

    this.numberAsString = function() {
        return this;
    };

    this.email = function() {
        return this;
    };

    this.emptyString = function() {
        return this;
    };

    this.greaterThan = function(mark) {
        return this;
    };

    this.lessThan = function(mark) {
        return this;
    };

    this.equal = function(mark) {
        return this;
    };

    this.notEqual = function(mark) {
        return this;
    };

    this.url = function() {
        return this;
    };

    this.ipv4 = function() {
        return this;
    };

    this.ipv6 = function() {
        return this;
    };

    this.jsonString = function() {
        return this;
    };
}

var Valdi = {
    sh: new MockVal()
};


console.log(Valdi.sh);

var FormInput = {
    email: Valdi.sh.new('This is valid email').string().email(),
    yob: Valdi.sh.new('This is valid year of birth').integer().greaterThan(1890).lessThan(2008)
}


console.log(FormInput.email.value('ABNC', true));  // FALSE
console.log(FormInput.email.value('me@domain.com'));
console.log(FormInput.yob.value(1934));
console.log(FormInput.yob.value(3019, true));      // FALSE

