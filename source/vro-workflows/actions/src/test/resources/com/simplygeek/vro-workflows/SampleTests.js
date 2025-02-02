describe("sample", function() {
    var sample = System.getModule("com.simplygeek.vro-workflows").sample;
    it("should add two numbers", function() {
        expect(sample(5, 2)).toBe(7);
    });
});
