using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace server.Hubs
{
    public class cacheHub : Hub
    {
      //  public async Task SendMessage(string user, string message)
      //   {
      //       await Clients.All.SendAsync("ReceiveMessage", user, message);
      //   }

        public Task Send(string data)
        {
            return Clients.All.SendAsync("Send", data);
        }

    }
}