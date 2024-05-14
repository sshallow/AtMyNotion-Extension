
import "@plasmohq/messaging"

interface MmMetadata {
	"background-cros-notion-image" : {}
	"background-get-spaces" : {}
	"background-notion-search" : {}
}

interface MpMetadata {
	
}

declare module "@plasmohq/messaging" {
  interface MessagesMetadata extends MmMetadata {}
  interface PortsMetadata extends MpMetadata {}
}
