describe("Something", function() {
    ConfigurationElement = function (name, attributes) {
        this.attributes = attributes;
        this.configurationElementCategory = null;
        this.description = "";
        this.name = name;
        this.version = "0.0.0";
        this.getAttributeWithKey = function getAttributeWithKey (key) {
            return this.attributes[key];
        };
        this.removeAttributeWithKey = function removeAttributeWithKey (key) {
            delete this.attributes[key];
        };
        this.setAttributeWithKey = function setAttributeWithKey (key, value) {
            this.attributes[key] = {key: key, value: value};
        };

        this.reload = function() {
            // all up-to-date
        };
    };
    Server = {
        query: jasmine.createSpy('query').and.returnValue(new ConfigurationElement("test"))
    }

    it("should set attribute", function() {
        System.getModule("local.corp.it.cloud.dns").setAttribute("Corp/Cloud/Util/test", "value", 1);
        var value = System.getModule("local.corp.it.cloud.dns").getAttribute("Corp/Cloud/Util/test", "value");
        expect(value).toBe(1);
    });
});