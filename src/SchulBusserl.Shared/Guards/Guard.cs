namespace SchulBusserl.Shared.Guards;

public class Guard : IGuard
{
    private Guard() { }

    public static IGuard Against { get; } = new Guard();
}