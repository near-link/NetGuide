export interface Step {
  title: string;
  explanation: string;
  topologyDiagram?: boolean;
  cli?: string;
  whatThisDoes?: string;
  verification?: string;
  verificationNote?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  stepCount: number;
  steps: Step[];
  quiz: QuizQuestion[];
  downloads: {
    starter: string;
    complete: string;
  };
}

export const modules: Module[] = [
  {
    id: "inter-vlan",
    number: 1,
    title: "Inter-VLAN Routing",
    description:
      "Learn how to logically segment a network into VLANs and enable communication between them using Router-on-a-Stick (ROAS) configuration on a Cisco router.",
    difficulty: "Beginner",
    topics: [
      "VLANs",
      "Trunk Ports",
      "Subinterfaces",
      "802.1Q Encapsulation",
      "DHCP",
    ],
    stepCount: 8,
    downloads: {
      starter: "/downloads/module1-starter.pkt",
      complete: "/downloads/module1-complete.pkt",
    },
    quiz: [
      {
        id: 1,
        question: "What is the purpose of a trunk port in an Inter-VLAN routing setup?",
        options: [
          "To connect a PC directly to the router",
          "To carry traffic for multiple VLANs between the switch and router",
          "To assign a static IP address to a VLAN",
          "To block traffic between VLANs",
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        question: "Which encapsulation type is configured on router subinterfaces for 802.1Q VLAN tagging?",
        options: ["ISL", "PPP", "dot1Q", "HDLC"],
        correctIndex: 2,
      },
      {
        id: 3,
        question: "In a Router-on-a-Stick setup, how many physical router interfaces are used regardless of how many VLANs exist?",
        options: [
          "One per VLAN",
          "Two: one for data, one for management",
          "One physical interface with multiple subinterfaces",
          "One per switch port",
        ],
        correctIndex: 2,
      },
      {
        id: 4,
        question: "What command verifies that VLANs are correctly assigned to switch ports?",
        options: [
          "show ip route",
          "show interfaces trunk",
          "show vlan brief",
          "show ip dhcp binding",
        ],
        correctIndex: 2,
      },
      {
        id: 5,
        question: 'What does the DHCP pool command "default-router" specify?',
        options: [
          "The DNS server address",
          "The IP address of the default gateway for DHCP clients",
          "The router's hostname",
          "The lease duration for IP addresses",
        ],
        correctIndex: 1,
      },
    ],
    steps: [
      {
        title: "Understanding the Topology",
        explanation:
          "In this module, we work with a simple campus network: 1 Router, 1 Switch, and 3 VLANs representing IT (VLAN 10), HR (VLAN 20), and Finance (VLAN 30). Each VLAN has 3 PCs, making 9 PCs total. The router connects to the switch via a single trunk link and uses subinterfaces to route between VLANs. This is called Router-on-a-Stick (ROAS).",
        topologyDiagram: true,
      },
      {
        title: "Creating VLANs on the Switch",
        explanation:
          "Before traffic can be separated, we need to create the VLANs on the switch. Each VLAN represents a department. We give each VLAN a meaningful name so it's easy to identify later.",
        cli: `Switch> enable
Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name IT_Department
Switch(config-vlan)# exit
Switch(config)# vlan 20
Switch(config-vlan)# name HR_Department
Switch(config-vlan)# exit
Switch(config)# vlan 30
Switch(config-vlan)# name Finance_Department
Switch(config-vlan)# exit`,
        whatThisDoes:
          "These commands create three VLANs (10, 20, 30) on the switch and assign human-readable names. This logically segments the switch into three broadcast domains. Devices in different VLANs can't talk to each other without a router.",
      },
      {
        title: "Assigning Access Ports",
        explanation:
          "Now we assign switch ports to VLANs. Ports fa0/1–3 go to IT, fa0/4–6 to HR, and fa0/7–9 to Finance. These are set as access ports, meaning each only carries traffic for one VLAN.",
        cli: `Switch(config)# interface range fa0/1 - 3
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
Switch(config-if-range)# exit
Switch(config)# interface range fa0/4 - 6
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 20
Switch(config-if-range)# exit
Switch(config)# interface range fa0/7 - 9
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 30
Switch(config-if-range)# exit`,
        whatThisDoes:
          "Each port is locked to a specific VLAN. Any device plugged into fa0/1–3 joins VLAN 10 (IT), fa0/4–6 joins VLAN 20 (HR), and fa0/7–9 joins VLAN 30 (Finance). Traffic stays within its VLAN.",
      },
      {
        title: "Configuring the Trunk Port",
        explanation:
          "The link between the switch and the router needs to carry traffic from all three VLANs simultaneously. We configure fa0/24 as a trunk port and specify which VLANs are allowed.",
        cli: `Switch(config)# interface fa0/24
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
Switch(config-if)# exit`,
        whatThisDoes:
          "A trunk port carries traffic from multiple VLANs over a single physical link using 802.1Q tagging. Each frame gets a VLAN ID tag so the router knows which VLAN it belongs to.",
      },
      {
        title: "Creating Router Subinterfaces",
        explanation:
          "On the router side, we create virtual subinterfaces on the physical interface (fa0/0). Each subinterface handles traffic for one VLAN. We assign the dot1Q encapsulation and an IP address that serves as the default gateway for that VLAN.",
        cli: `Router> enable
Router# configure terminal
Router(config)# interface fa0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config-subif)# exit
Router(config)# interface fa0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
Router(config-subif)# exit
Router(config)# interface fa0/0.30
Router(config-subif)# encapsulation dot1Q 30
Router(config-subif)# ip address 192.168.30.1 255.255.255.0
Router(config-subif)# exit`,
        whatThisDoes:
          "Each subinterface acts as a gateway for its VLAN. When a PC in VLAN 10 wants to reach VLAN 20, the traffic goes to the router via the trunk, hits subinterface fa0/0.10, gets routed to fa0/0.20, and goes back down the trunk to VLAN 20.",
      },
      {
        title: "Enabling the Physical Interface",
        explanation:
          "By default, router interfaces are shut down. We need to bring up the physical interface (fa0/0) so all the subinterfaces start working.",
        cli: `Router(config)# interface fa0/0
Router(config-if)# no shutdown
Router(config-if)# exit`,
        whatThisDoes:
          "The 'no shutdown' command activates the physical interface. Without this, none of the subinterfaces will pass traffic, even if they're configured correctly.",
      },
      {
        title: "Configuring DHCP Pools",
        explanation:
          "Instead of manually assigning IPs to all 9 PCs, we set up DHCP pools on the router. Each pool corresponds to a VLAN subnet and automatically assigns IP addresses and default gateways.",
        cli: `Router(config)# ip dhcp pool IT_Pool
Router(dhcp-config)# network 192.168.10.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.10.1
Router(dhcp-config)# exit
Router(config)# ip dhcp pool HR_Pool
Router(dhcp-config)# network 192.168.20.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.20.1
Router(dhcp-config)# exit
Router(config)# ip dhcp pool Finance_Pool
Router(dhcp-config)# network 192.168.30.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.30.1
Router(dhcp-config)# exit`,
        whatThisDoes:
          "Each DHCP pool leases IP addresses from the correct subnet and tells clients which gateway to use. PCs set to DHCP will automatically get an IP, subnet mask, and default gateway.",
      },
      {
        title: "Testing and Verification",
        explanation:
          "Time to verify everything works. We check the router interfaces, routing table, VLAN assignments, and trunk status. Then we test by pinging between VLANs.",
        cli: `Router# show ip interface brief
Router# show ip route
Switch# show vlan brief
Switch# show interfaces trunk`,
        whatThisDoes:
          "These show commands confirm that subinterfaces are up, routes exist for each subnet, VLANs are assigned to the correct ports, and the trunk is carrying all three VLANs.",
        verification: `PC1 (VLAN 10)> ping 192.168.20.2
PC1 (VLAN 10)> ping 192.168.30.2`,
        verificationNote:
          "If everything is configured correctly, pings between VLANs should succeed. If they fail, check trunk configuration, subinterface status, and DHCP assignments.",
      },
    ],
  },
  {
    id: "ospf",
    number: 2,
    title: "OSPF Dynamic Routing",
    description:
      "Configure OSPF across multiple routers so they automatically discover and share routes. Covers single-area OSPF in a multi-router enterprise topology.",
    difficulty: "Intermediate",
    topics: [
      "OSPF Process",
      "Router ID",
      "Network Statements",
      "Adjacency",
      "Route Verification",
    ],
    stepCount: 7,
    downloads: {
      starter: "/downloads/module2-starter.pkt",
      complete: "/downloads/module2-complete.pkt",
    },
    quiz: [
      {
        id: 1,
        question: "What is the purpose of the router-id command in OSPF configuration?",
        options: [
          "To assign an IP address to the router's loopback interface",
          "To uniquely identify the router within the OSPF process",
          "To set the OSPF area number",
          "To define which interfaces participate in routing",
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        question: 'In the network statement "network 192.168.1.0 0.0.0.255 area 0", what is 0.0.0.255?',
        options: [
          "The subnet mask in dotted decimal",
          "The wildcard mask used to match IP addresses",
          "The broadcast address of the network",
          "The OSPF process ID",
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        question: "Which command shows whether OSPF neighbor adjacencies have been successfully formed?",
        options: [
          "show ip route ospf",
          "show ip ospf interface",
          "show ip ospf neighbor",
          "show running-config",
        ],
        correctIndex: 2,
      },
      {
        id: 4,
        question: 'What does an "O" prefix on a route in the routing table indicate?',
        options: [
          "The route was learned via OSPF",
          "The route is a directly connected network",
          "The route was configured statically",
          "The route is a default route",
        ],
        correctIndex: 0,
      },
      {
        id: 5,
        question: "In a serial link between two routers, which side must have the clock rate command configured?",
        options: [
          "Both sides",
          "Neither side, clock rate is automatic",
          "The DCE side",
          "The DTE side",
        ],
        correctIndex: 2,
      },
    ],
    steps: [
      {
        title: "Understanding OSPF and the Topology",
        explanation:
          "OSPF (Open Shortest Path First) is a link-state routing protocol. It lets routers automatically learn about networks they're not directly connected to. In this lab, we have three routers (R1, R2, R3) connected in a triangle. Each router has a LAN segment with its own subnet. All interfaces are in OSPF Area 0.",
        topologyDiagram: true,
      },
      {
        title: "Assigning IP Addresses to Router Interfaces",
        explanation:
          "Before enabling OSPF, each router interface needs an IP address. The point-to-point links between routers use /30 subnets (only 2 usable hosts). Each router's LAN interface gets a /24 address.",
        cli: `! R1 Configuration
Router(config)# interface gig0/0
Router(config-if)# ip address 192.168.1.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit
Router(config)# interface serial0/0/0
Router(config-if)# ip address 10.0.0.1 255.255.255.252
Router(config-if)# no shutdown
Router(config-if)# exit
Router(config)# interface serial0/0/1
Router(config-if)# ip address 10.0.0.5 255.255.255.252
Router(config-if)# no shutdown
Router(config-if)# exit`,
        whatThisDoes:
          "We assign IPs to R1's LAN interface (192.168.1.1/24) and two serial links to R2 and R3. Repeat similar configs for R2 (192.168.2.x) and R3 (192.168.3.x) with matching serial IPs.",
      },
      {
        title: "Enabling OSPF Process",
        explanation:
          "We start OSPF with a process ID (locally significant), set a unique router ID, and declare which networks OSPF should advertise. The wildcard mask tells OSPF which interfaces to include.",
        cli: `! R1
Router(config)# router ospf 1
Router(config-router)# router-id 1.1.1.1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 10.0.0.0 0.0.0.3 area 0
Router(config-router)# network 10.0.0.4 0.0.0.3 area 0
Router(config-router)# exit

! R2
Router(config)# router ospf 1
Router(config-router)# router-id 2.2.2.2
Router(config-router)# network 192.168.2.0 0.0.0.255 area 0
Router(config-router)# network 10.0.0.0 0.0.0.3 area 0
Router(config-router)# network 10.0.0.8 0.0.0.3 area 0
Router(config-router)# exit

! R3
Router(config)# router ospf 1
Router(config-router)# router-id 3.3.3.3
Router(config-router)# network 192.168.3.0 0.0.0.255 area 0
Router(config-router)# network 10.0.0.4 0.0.0.3 area 0
Router(config-router)# network 10.0.0.8 0.0.0.3 area 0
Router(config-router)# exit`,
        whatThisDoes:
          "Each router starts an OSPF process, gets a unique router ID, and advertises its connected networks into Area 0. OSPF uses the wildcard mask (inverse of subnet mask) to match interfaces. Once all routers are configured, they start exchanging link-state advertisements.",
      },
      {
        title: "Verifying OSPF Neighbor Adjacency",
        explanation:
          "After enabling OSPF, routers go through a discovery process. They exchange Hello packets, negotiate parameters, and form neighbor adjacencies. We verify this with show commands.",
        cli: `Router# show ip ospf neighbor
Router# show ip ospf interface brief`,
        whatThisDoes:
          "The neighbor table shows which routers have formed an adjacency. You should see the neighbor's router ID, state (FULL means fully converged), and the interface connecting them. If a neighbor is missing, check interface status and OSPF network statements.",
        verification: `Router# show ip ospf neighbor`,
        verificationNote:
          "All neighbors should be in FULL state. If you see 2-WAY or INIT, the adjacency hasn't fully formed. Check matching OSPF parameters.",
      },
      {
        title: "Checking the Routing Table",
        explanation:
          "Once OSPF adjacencies are established, each router learns routes to remote networks. These appear in the routing table marked with 'O' for OSPF.",
        cli: `Router# show ip route ospf`,
        whatThisDoes:
          "This filters the routing table to only show OSPF-learned routes. R1 should see routes to 192.168.2.0/24 and 192.168.3.0/24 via the serial links. The metric (cost) tells you the preferred path.",
      },
      {
        title: "Testing Connectivity Across Routers",
        explanation:
          "The real test: can devices on different LANs reach each other through OSPF-learned routes? We ping from a PC on R1's LAN to a PC on R3's LAN.",
        topologyDiagram: true,
        verification: `PC on R1 LAN> ping 192.168.3.10
PC on R1 LAN> ping 192.168.2.10`,
        verificationNote:
          "Both pings should succeed. The traffic crosses multiple routers using OSPF-learned routes. If it fails, check the routing table on each hop.",
      },
      {
        title: "Troubleshooting Common OSPF Issues",
        explanation:
          "OSPF can fail silently. Here are the most common problems and how to diagnose them.",
        cli: `! Check if OSPF is running
Router# show ip protocols

! Check interface OSPF status
Router# show ip ospf interface gig0/0

! Check for mismatched parameters
Router# show ip ospf

! Debug OSPF (use carefully)
Router# debug ip ospf adj`,
        whatThisDoes:
          "Common issues include: mismatched hello/dead timers, wrong area IDs, missing network statements, interfaces in shutdown state, and mismatched subnet masks. These show commands help pinpoint exactly where the problem is.",
      },
    ],
  },
  {
    id: "acl",
    number: 3,
    title: "ACL Security",
    description:
      "Use Access Control Lists to control traffic flow between network segments. Learn how to permit and deny specific traffic to enforce security policies.",
    difficulty: "Intermediate",
    topics: [
      "Standard ACL",
      "Extended ACL",
      "Named ACL",
      "Interface Application",
      "Testing",
    ],
    stepCount: 6,
    downloads: {
      starter: "/downloads/module3-starter.pkt",
      complete: "/downloads/module3-complete.pkt",
    },
    quiz: [
      {
        id: 1,
        question: "What is the difference between a standard ACL and an extended ACL?",
        options: [
          "Standard ACLs filter by destination IP only; extended ACLs filter by source IP only",
          "Standard ACLs filter by source IP only; extended ACLs can filter by source, destination, and protocol",
          "Standard ACLs are applied inbound; extended ACLs are applied outbound",
          "There is no difference. They use the same syntax",
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        question: 'In the ACL rule "deny ip 192.168.30.0 0.0.0.255 192.168.20.0 0.0.0.255", what traffic is being blocked?',
        options: [
          "All traffic from the 192.168.20.0 network to the 192.168.30.0 network",
          "All traffic from the 192.168.30.0 network to the 192.168.20.0 network",
          "All traffic between 192.168.30.0 and any other network",
          "Ping traffic only between the two networks",
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        question: 'Why must a "permit ip any any" statement be added at the end of a named ACL?',
        options: [
          "To allow the router to process the ACL faster",
          "Because all ACLs have an implicit deny all at the end that would block all other traffic",
          "To enable DHCP to function correctly",
          "It is optional and has no effect",
        ],
        correctIndex: 1,
      },
      {
        id: 4,
        question: "When applying an ACL to block traffic coming from VLAN 30's subinterface, which direction should it be applied?",
        options: [
          "Outbound (out) on the VLAN 30 subinterface",
          "Inbound (in) on the VLAN 20 subinterface",
          "Inbound (in) on the VLAN 30 subinterface",
          "Outbound (out) on the physical interface",
        ],
        correctIndex: 2,
      },
      {
        id: 5,
        question: "Which command shows how many times each ACL rule has been matched?",
        options: [
          "show running-config",
          "show ip access-lists",
          "show interfaces",
          "show ip route",
        ],
        correctIndex: 1,
      },
    ],
    steps: [
      {
        title: "Understanding ACLs: Standard vs Extended",
        explanation:
          "Access Control Lists (ACLs) are packet filters. They inspect traffic and decide whether to permit or deny it based on rules you define. Standard ACLs filter by source IP only. Extended ACLs can filter by source IP, destination IP, protocol, and port number. We'll use extended ACLs because they give us more control.",
        topologyDiagram: true,
      },
      {
        title: "Planning the ACL Policy",
        explanation:
          "Before writing any commands, we plan what we want to achieve. Our policy: block Finance (VLAN 30, subnet 192.168.30.0/24) from accessing HR (VLAN 20, subnet 192.168.20.0/24). All other traffic should be allowed. We apply this as close to the source as possible, on the router's fa0/0.30 subinterface, inbound.",
        whatThisDoes:
          "ACL placement matters. Extended ACLs should be placed close to the source of the traffic being filtered. This prevents unwanted traffic from consuming bandwidth across the network. We apply it inbound on the Finance subinterface so traffic is filtered before the router makes a routing decision.",
      },
      {
        title: "Creating the Extended ACL",
        explanation:
          "We create a named extended ACL called BLOCK_FINANCE_HR. The first rule denies all IP traffic from the Finance subnet to the HR subnet. The second rule permits everything else. Without this, the implicit deny at the end would block all traffic.",
        cli: `Router(config)# ip access-list extended BLOCK_FINANCE_HR
Router(config-ext-nacl)# deny ip 192.168.30.0 0.0.0.255 192.168.20.0 0.0.0.255
Router(config-ext-nacl)# permit ip any any
Router(config-ext-nacl)# exit`,
        whatThisDoes:
          "The deny statement matches any packet from 192.168.30.x going to 192.168.20.x and drops it. The permit statement allows everything else through. Order matters. The router checks rules top to bottom and stops at the first match.",
      },
      {
        title: "Applying the ACL to the Interface",
        explanation:
          "An ACL does nothing until it's applied to an interface. We attach it to the Finance subinterface (fa0/0.30) in the inbound direction. This filters Finance traffic before it gets routed.",
        cli: `Router(config)# interface fa0/0.30
Router(config-subif)# ip access-group BLOCK_FINANCE_HR in
Router(config-subif)# exit`,
        whatThisDoes:
          "The 'ip access-group' command links the ACL to the interface. The 'in' keyword means it checks packets arriving on this interface (from Finance). Outbound ('out') would check packets leaving the interface instead.",
      },
      {
        title: "Verifying the ACL",
        explanation:
          "We need to confirm the ACL exists and is applied correctly. The show commands tell us what rules are defined and how many packets have matched each rule.",
        cli: `Router# show ip access-lists
Router# show running-config | include access
Router# show ip interface fa0/0.30`,
        whatThisDoes:
          "The first command shows all ACLs and match counts. The second checks the running config for any access-list references. The third confirms which ACL is applied to the interface and in which direction.",
      },
      {
        title: "Testing: Ping Should Fail from Finance to HR",
        explanation:
          "Final test. Ping from a Finance PC (VLAN 30) to an HR PC (VLAN 20). It should fail. Then ping from Finance to IT (VLAN 10). It should succeed. This confirms the ACL is blocking only the intended traffic.",
        topologyDiagram: true,
        verification: `! This should FAIL
PC (VLAN 30)> ping 192.168.20.2

! This should SUCCEED
PC (VLAN 30)> ping 192.168.10.2

! This should SUCCEED
PC (VLAN 10)> ping 192.168.20.2`,
        verificationNote:
          "If Finance can still reach HR, check that the ACL is applied to the correct interface and direction. Run 'show ip access-lists' to see if the deny rule is matching packets.",
      },
    ],
  },
];
