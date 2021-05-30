const suma = (a: number, b: number) => a + b;

describe('prueba.ts', () => {
  it('prueba 1', () => {
    const resultado = suma(3, 4);

    expect(resultado).toBe(7);
  });
});
